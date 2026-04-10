import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import prisma from '../lib/prisma.js'

dotenv.config()

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME?.trim()
  const email = process.env.ADMIN_EMAIL?.trim()
  const password = process.env.ADMIN_PASSWORD

  if (!username || !email || !password) {
    throw new Error('ADMIN_USERNAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.')
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.user.upsert({
    where: { username },
    update: {
      email,
      role: 'admin',
      passwordHash,
    },
    create: {
      username,
      email,
      role: 'admin',
      passwordHash,
    },
  })

  console.log(`Admin user seeded: ${username}`)
}

seedAdmin()
  .catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
