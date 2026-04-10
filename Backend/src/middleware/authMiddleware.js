import jwt from 'jsonwebtoken'

function getBearerToken(authorizationHeader) {
  if (!authorizationHeader) {
    return null
  }

  const [scheme, token] = authorizationHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return null
  }

  return token
}

export function requireAdminAuth(request, response, next) {
  if (!process.env.JWT_SECRET) {
    response.status(500).json({ message: 'JWT secret is not configured on the server.' })
    return
  }

  const token = getBearerToken(request.headers.authorization)

  if (!token) {
    response.status(401).json({ message: 'Admin authentication required.' })
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if (payload.role !== 'admin' || !payload.userId || !payload.username) {
      response.status(403).json({ message: 'Admin access is required.' })
      return
    }

    request.admin = {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
    }

    next()
  } catch (_error) {
    response.status(401).json({ message: 'Invalid or expired admin session.' })
  }
}
