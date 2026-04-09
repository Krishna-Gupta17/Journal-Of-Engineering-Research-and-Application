const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

function buildHeaders(token, headers = {}) {
  const nextHeaders = { ...headers }

  if (token) {
    nextHeaders.Authorization = `Bearer ${token}`
  }

  return nextHeaders
}

async function request(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, options)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

function mapVolume(volume) {
  return {
    id: volume.id,
    name: volume.name,
    issues: (volume.issues || []).map((issue) => ({
      id: issue.id,
      name: issue.name,
      papers: (issue.papers || []).map((paper) => ({
        id: paper.id,
        title: paper.title,
        authorName: paper.authorName,
        pdfUrl: paper.pdfUrl,
        pdfPreviewUrl: `${apiBaseUrl}/public/papers/${paper.id}/pdf`,
        fileName: paper.fileName,
        uploadedAt: paper.uploadedAt,
      })),
    })),
  }
}

export async function fetchCatalog() {
  const data = await request('/public/volumes')
  return (data.volumes || []).map(mapVolume)
}

export async function adminLogin(username, password) {
  return request('/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}

export async function verifyAdminSession(token) {
  return request('/auth/admin/session', {
    method: 'GET',
    headers: buildHeaders(token),
  })
}

export async function createVolume(name, token) {
  return request('/admin/volumes', {
    method: 'POST',
    headers: buildHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ name }),
  })
}

export async function createIssue(volumeId, name, token) {
  return request('/admin/issues', {
    method: 'POST',
    headers: buildHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ volumeId, name }),
  })
}

export async function createPaper({ volumeId, issueId, title, authorName, pdfFile, token }) {
  const formData = new FormData()
  formData.append('volumeId', volumeId)
  formData.append('issueId', issueId)
  formData.append('title', title)
  formData.append('authorName', authorName)
  formData.append('pdfFile', pdfFile)

  return request('/admin/papers', {
    method: 'POST',
    headers: buildHeaders(token),
    body: formData,
  })
}

export async function deleteVolume(volumeId, token) {
  return request(`/admin/volumes/${volumeId}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  })
}

export async function deleteIssue(issueId, token) {
  return request(`/admin/issues/${issueId}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  })
}

export async function deletePaper(paperId, token) {
  return request(`/admin/papers/${paperId}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  })
}
