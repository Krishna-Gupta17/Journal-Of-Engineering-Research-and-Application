import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { requireAdminAuth } from '../middleware/authMiddleware.js'

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required.'),
  password: z.string().min(1, 'Password is required.'),
})

const router = Router()

router.post('/admin/login', (request, response) => {
  const parsedBody = loginSchema.safeParse(request.body)

  if (!parsedBody.success) {
    response.status(400).json({ message: 'Username and password are required.' })
    return
  }

  const { username, password } = parsedBody.data
  const expectedUsername = process.env.ADMIN_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedUsername || !expectedPassword || !process.env.JWT_SECRET) {
    response.status(500).json({ message: 'Admin authentication is not configured on the server.' })
    return
  }

  if (username !== expectedUsername || password !== expectedPassword) {
    response.status(401).json({ message: 'Invalid admin username or password.' })
    return
  }

  const token = jwt.sign(
    {
      role: 'admin',
      username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' },
  )

  response.json({ token })
})

router.get('/admin/session', requireAdminAuth, (request, response) => {
  response.json({
    ok: true,
    admin: {
      username: request.admin.username,
    },
  })
})

export default router
