const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  description: {
    type: String,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;