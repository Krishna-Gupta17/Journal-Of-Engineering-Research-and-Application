import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import prisma from '../lib/prisma.js'
import { requireAdminAuth } from '../middleware/authMiddleware.js'

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required.'),
  password: z.string().min(1, 'Password is required.'),
})

const router = Router()

router.post('/admin/login', async (request, response, next) => {
  const parsedBody = loginSchema.safeParse(request.body)

  if (!parsedBody.success) {
    response.status(400).json({ message: 'Username and password are required.' })
    return
  }

  try {
    const { username, password } = parsedBody.data

    if (!process.env.JWT_SECRET) {
      response.status(500).json({ message: 'JWT secret is not configured on the server.' })
      return
    }

    if (!prisma.user || typeof prisma.user.findUnique !== 'function') {
      response.status(500).json({
        message:
          'User authentication model is not available on this deployment. Run Prisma generate and apply latest migrations.',
      })
      return
    }

    const adminUser = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        role: true,
        passwordHash: true,
      },
    })

    if (!adminUser || adminUser.role !== 'admin') {
      response.status(401).json({ message: 'Invalid admin username or password.' })
      return
    }

    const passwordMatches = await bcrypt.compare(password, adminUser.passwordHash)

    if (!passwordMatches) {
      response.status(401).json({ message: 'Invalid admin username or password.' })
      return
    }

    const token = jwt.sign(
      {
        userId: adminUser.id,
        role: adminUser.role,
        username: adminUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
    )

    response.json({ token })
  } catch (error) {
    next(error)
  }
})

router.get('/admin/session', requireAdminAuth, async (request, response, next) => {
  try {
    if (!prisma.user || typeof prisma.user.findFirst !== 'function') {
      response.status(500).json({
        message:
          'User authentication model is not available on this deployment. Run Prisma generate and apply latest migrations.',
      })
      return
    }

    const adminUser = await prisma.user.findFirst({
      where: {
        id: request.admin.userId,
        role: 'admin',
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    })

    if (!adminUser) {
      response.status(401).json({ message: 'Invalid or expired admin session.' })
      return
    }

    response.json({
      ok: true,
      admin: adminUser,
    })
  } catch (error) {
    next(error)
  }
})

export default router
