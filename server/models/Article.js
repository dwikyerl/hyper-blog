const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;