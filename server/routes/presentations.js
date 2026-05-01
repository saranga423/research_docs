const express = require('express')
const router  = express.Router()
const Presentation = require('../models/Presentation.model')

router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query
    const query = { isPublished: true }
    if (category) query.category = { $regex: category, $options: 'i' }
    if (search)   query.$or = [
      { title:     { $regex: search, $options: 'i' } },
      { presenter: { $regex: search, $options: 'i' } },
      { event:     { $regex: search, $options: 'i' } },
    ]
    const ppts = await Presentation.find(query).sort('-createdAt')
    res.json(ppts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const ppt = await Presentation.findById(req.params.id)
    if (!ppt) return res.status(404).json({ message: 'Not found' })
    res.json(ppt)
  } catch (err) { res.status(500).json({ message: err.message }) }
})

router.post('/', async (req, res) => {
  try {
    const ppt = await new Presentation(req.body).save()
    res.status(201).json(ppt)
  } catch (err) { res.status(400).json({ message: err.message }) }
})

router.put('/:id', async (req, res) => {
  try {
    const ppt = await Presentation.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!ppt) return res.status(404).json({ message: 'Not found' })
    res.json(ppt)
  } catch (err) { res.status(500).json({ message: err.message }) }
})

router.delete('/:id', async (req, res) => {
  try {
    await Presentation.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) { res.status(500).json({ message: err.message }) }
})

module.exports = router