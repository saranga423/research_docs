const express = require('express')
const router  = express.Router()
const Document = require('../models/Document.model')

router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query
    const query = { isPublished: true }
    if (category) query.category = { $regex: category, $options: 'i' }
    if (search)   query.$or = [
      { title:       { $regex: search, $options: 'i' } },
      { author:      { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ]
    const docs = await Document.find(query).sort('-createdAt')
    res.json(docs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch (err) { res.status(500).json({ message: err.message }) }
})

router.post('/', async (req, res) => {
  try {
    const doc = await new Document(req.body).save()
    res.status(201).json(doc)
  } catch (err) { res.status(400).json({ message: err.message }) }
})

router.put('/:id', async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!doc) return res.status(404).json({ message: 'Not found' })
    res.json(doc)
  } catch (err) { res.status(500).json({ message: err.message }) }
})

router.delete('/:id', async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) { res.status(500).json({ message: err.message }) }
})

module.exports = router