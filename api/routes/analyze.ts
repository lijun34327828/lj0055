import { Router, type Request, type Response } from 'express'
import { analyzeText, optimizeText } from '../services/textAnalyzer.js'

const router = Router()

router.post('/analyze', async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body

  if (!text || typeof text !== 'string') {
    res.status(400).json({
      success: false,
      error: 'text field is required and must be a string',
    })
    return
  }

  if (text.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: 'text cannot be empty',
    })
    return
  }

  try {
    const result = analyzeText(text)
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Analysis failed',
    })
  }
})

router.post('/optimize', async (req: Request, res: Response): Promise<void> => {
  const { text, style, gaps } = req.body

  if (!text || typeof text !== 'string') {
    res.status(400).json({
      success: false,
      error: 'text field is required and must be a string',
    })
    return
  }

  if (!style || (style !== 'children' && style !== 'literary')) {
    res.status(400).json({
      success: false,
      error: 'style field is required and must be "children" or "literary"',
    })
    return
  }

  try {
    const result = optimizeText(text, style, gaps)
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Optimization failed',
    })
  }
})

export default router
