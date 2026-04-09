import { Router } from 'express'
import { listVolumes, streamPaperPdf } from '../controllers/catalogController.js'

const router = Router()

router.get('/papers/:paperId/pdf', streamPaperPdf)
router.get('/volumes', listVolumes)

export default router
