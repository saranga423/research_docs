const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category:    { type: String, required: true, trim: true },
  author:      { type: String, required: true, trim: true },
  year:        { type: String },
  fileUrl:     { type: String, required: true },
  fileType:    { type: String, enum: ['PDF','DOC','DOCX'], default: 'PDF' },
  pages:       { type: Number },
  tags:        [String],
  isPublished: { type: Boolean, default: true },
  downloads:   { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Document', documentSchema)