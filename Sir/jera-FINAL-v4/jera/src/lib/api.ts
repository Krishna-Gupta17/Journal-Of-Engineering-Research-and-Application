export const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || '/api').replace(/\/$/, '')

function buildHeaders(token?: string, headers: HeadersInit = {}) {
  const nextHeaders: Record<string, string> = { ...headers as Record<string, string> }

  if (token) {
    nextHeaders.Authorization = `Bearer ${token}`
  }

  return nextHeaders
}

async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, options)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

function mapVolume(volume: any) {
  return {
    id: volume.id,
    name: volume.name,
    createdAt: volume.createdAt,
    issues: (volume.issues || [])
      .slice()
      .sort((a: any, b: any) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
      .map((issue: any) => ({
        id: issue.id,
        name: issue.name,
        createdAt: issue.createdAt,
        papers: (issue.papers || []).map((paper: any) => ({
          id: paper.id,
          title: paper.title,
          authorName: paper.authorName,
          pdfUrl: paper.pdfUrl,
          pdfPreviewUrl: `${apiBaseUrl}/api/public/papers/${paper.id}/pdf`,
          fileName: paper.fileName,
          uploadedAt: paper.uploadedAt,
        })),
      })),
  }
}

export async function fetchCatalog() {
  const data = await request('/api/public/volumes')
  return (data.volumes || [])
    .slice()
    .sort((a: any, b: any) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
    .map(mapVolume)
}

export async function adminLogin(username: string, password: string) {
  return request('/api/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}

export async function verifyAdminSession(token: string) {
  return request('/api/auth/admin/session', {
    method: 'GET',
    headers: buildHeaders(token),
  })
}

export async function createVolume(name: string, token: string) {
  return request('/api/admin/volumes', {
    method: 'POST',
    headers: buildHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ name }),
  })
}

export async function createIssue(volumeId: string, name: string, token: string) {
  return request('/api/admin/issues', {
    method: 'POST',
    headers: buildHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ volumeId, name }),
  })
}

export async function createPaper({ volumeId, issueId, title, authorName, pdfFile, token }: { volumeId: string, issueId: string, title: string, authorName: string, pdfFile: File, token: string }) {
  const formData = new FormData()
  formData.append('volumeId', volumeId)
  formData.append('issueId', issueId)
  formData.append('title', title)
  formData.append('authorName', authorName)
  formData.append('pdfFile', pdfFile)

  return request('/api/admin/papers', {
    method: 'POST',
    headers: buildHeaders(token),
    body: formData,
  })
}

export async function deleteVolume(volumeId: string, token: string) {
  return request(`/api/admin/volumes/${volumeId}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  })
}

export async function deleteIssue(issueId: string, token: string) {
  return request(`/api/admin/issues/${issueId}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  })
}

export async function deletePaper(paperId: string, token: string) {
  return request(`/api/admin/papers/${paperId}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  })
}
