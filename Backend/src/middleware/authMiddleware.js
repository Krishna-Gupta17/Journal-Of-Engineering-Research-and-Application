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
  const token = getBearerToken(request.headers.authorization)

  if (!token) {
    response.status(401).json({ message: 'Admin authentication required.' })
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    request.admin = payload
    next()
  } catch (_error) {
    response.status(401).json({ message: 'Invalid or expired admin session.' })
  }
}
