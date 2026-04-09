import prisma from '../lib/prisma.js'
import { deletePdfByPublicId, uploadPdfBuffer } from '../lib/cloudinary.js'
import { z } from 'zod'

const volumeSchema = z.object({
  name: z.string().trim().min(1, 'Volume name is required.'),
})

const issueSchema = z.object({
  volumeId: z.string().min(1, 'Volume is required.'),
  name: z.string().trim().min(1, 'Issue name is required.'),
})

const paperSchema = z.object({
  volumeId: z.string().min(1, 'Volume is required.'),
  issueId: z.string().min(1, 'Issue is required.'),
  title: z.string().trim().min(1, 'Paper title is required.').max(250, 'Paper title must be 250 characters or less.'),
  authorName: z.string().trim().min(1, 'Author name is required.'),
})

function mapVolumes(volumes) {
  return volumes.map((volume) => ({
    id: volume.id,
    name: volume.name,
    issues: volume.issues.map((issue) => ({
      id: issue.id,
      name: issue.name,
      papers: issue.papers.map((paper) => ({
        id: paper.id,
        title: paper.title,
        authorName: paper.authorName,
        pdfUrl: paper.pdfUrl,
        fileName: paper.fileName,
        uploadedAt: paper.createdAt,
      })),
    })),
  }))
}

function toSafePdfFilename(name) {
  const cleanedName = (name || 'paper').replace(/[^a-zA-Z0-9._-]/g, '_')
  return cleanedName.toLowerCase().endsWith('.pdf') ? cleanedName : `${cleanedName}.pdf`
}

export async function listVolumes(_request, response, next) {
  try {
    const volumes = await prisma.volume.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        issues: {
          orderBy: { createdAt: 'asc' },
          include: {
            papers: { orderBy: { createdAt: 'desc' } },
          },
        },
      },
    })

    response.json({ volumes: mapVolumes(volumes) })
  } catch (error) {
    next(error)
  }
}

export async function streamPaperPdf(request, response, next) {
  try {
    const { paperId } = request.params

    if (!paperId) {
      response.status(400).json({ message: 'Paper id is required.' })
      return
    }

    const paper = await prisma.paper.findUnique({
      where: { id: paperId },
      select: {
        id: true,
        title: true,
        fileName: true,
        pdfUrl: true,
      },
    })

    if (!paper) {
      response.status(404).json({ message: 'Paper not found.' })
      return
    }

    const upstreamResponse = await fetch(paper.pdfUrl)

    if (!upstreamResponse.ok) {
      response.status(502).json({ message: 'Unable to fetch PDF from storage provider.' })
      return
    }

    const pdfBuffer = Buffer.from(await upstreamResponse.arrayBuffer())
    const upstreamContentType = upstreamResponse.headers.get('content-type') || ''
    const contentType = upstreamContentType.includes('pdf') ? upstreamContentType : 'application/pdf'
    const filename = toSafePdfFilename(paper.fileName || paper.title || 'paper')

    response.setHeader('Content-Type', contentType)
    response.setHeader('Content-Disposition', `inline; filename="${filename}"`)
    response.setHeader('Cache-Control', 'public, max-age=600')
    response.status(200).send(pdfBuffer)
  } catch (error) {
    next(error)
  }
}

export async function createVolume(request, response, next) {
  try {
    const { name } = volumeSchema.parse(request.body)
    const volume = await prisma.volume.create({ data: { name } })
    response.status(201).json({ volume })
  } catch (error) {
    next(error)
  }
}

export async function createIssue(request, response, next) {
  try {
    const { volumeId, name } = issueSchema.parse(request.body)
    const issue = await prisma.issue.create({ data: { volumeId, name } })
    response.status(201).json({ issue })
  } catch (error) {
    next(error)
  }
}

export async function createPaper(request, response, next) {
  try {
    const { volumeId, issueId, title, authorName } = paperSchema.parse(request.body)
    const file = request.file

    if (!file) {
      response.status(400).json({ message: 'PDF file is required.' })
      return
    }

    if (file.mimetype !== 'application/pdf') {
      response.status(400).json({ message: 'Only PDF files are allowed.' })
      return
    }

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
      select: { id: true, volumeId: true },
    })

    if (!issue || issue.volumeId !== volumeId) {
      response.status(400).json({ message: 'Selected issue does not belong to the selected volume.' })
      return
    }

    const uploadedFile = await uploadPdfBuffer(file.buffer, file.originalname)
    const paper = await prisma.paper.create({
      data: {
        issueId,
        title,
        authorName,
        pdfUrl: uploadedFile.secure_url,
        pdfPublicId: uploadedFile.public_id,
        fileName: file.originalname,
      },
    })

    response.status(201).json({ paper, volumeId })
  } catch (error) {
    next(error)
  }
}

export async function deleteVolume(request, response, next) {
  try {
    const { volumeId } = request.params

    if (!volumeId) {
      response.status(400).json({ message: 'Volume id is required.' })
      return
    }

    await prisma.volume.delete({ where: { id: volumeId } })
    response.status(200).json({ ok: true })
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Volume not found.' })
      return
    }

    next(error)
  }
}

export async function deleteIssue(request, response, next) {
  try {
    const { issueId } = request.params

    if (!issueId) {
      response.status(400).json({ message: 'Issue id is required.' })
      return
    }

    await prisma.issue.delete({ where: { id: issueId } })
    response.status(200).json({ ok: true })
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Issue not found.' })
      return
    }

    next(error)
  }
}

export async function deletePaper(request, response, next) {
  try {
    const { paperId } = request.params

    if (!paperId) {
      response.status(400).json({ message: 'Paper id is required.' })
      return
    }

    const existingPaper = await prisma.paper.findUnique({
      where: { id: paperId },
      select: {
        id: true,
        pdfPublicId: true,
      },
    })

    if (!existingPaper) {
      response.status(404).json({ message: 'Paper not found.' })
      return
    }

    await prisma.paper.delete({ where: { id: paperId } })
    await deletePdfByPublicId(existingPaper.pdfPublicId)

    response.status(200).json({ ok: true })
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Paper not found.' })
      return
    }

    next(error)
  }
}
