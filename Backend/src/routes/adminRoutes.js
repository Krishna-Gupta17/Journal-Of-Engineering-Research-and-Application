import { Router } from 'express'
import multer from 'multer'
import { createIssue, createPaper, createVolume } from '../controllers/catalogController.js'
import { requireAdminAuth } from '../middleware/authMiddleware.js'

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
})
const router = Router()

router.use(requireAdminAuth)

router.post('/volumes', createVolume)
router.post('/issues', createIssue)
router.post('/papers', upload.single('pdfFile'), createPaper)

export default router
