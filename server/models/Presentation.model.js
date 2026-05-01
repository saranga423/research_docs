const mongoose = require('mongoose')

const presentationSchema = new mongoose.Schema({
  title:        { type: String, required: true, trim: true },
  description:  { type: String, trim: true },
  category:     { type: String, required: true, trim: true },
  presenter:    { type: String, required: true, trim: true },
  date:         { type: String },
  event:        { type: String },
  fileUrl:      { type: String, required: true },
  thumbnailUrl: { type: String, default: null },
  slideCount:   { type: Number },
  tags:         [String],
  isPublished:  { type: Boolean, default: true },
  downloads:    { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Presentation', presentationSchema)