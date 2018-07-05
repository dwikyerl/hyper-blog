const { Article, Category } = require('./../models');

function beautifyString(string) {
  return string.toLowerCase().replace(/([^a-z])([a-z])(?=[a-z]{2})|^([a-z])/g, 
  (_, g1, g2, g3) => {
    return (typeof g1 === 'undefined') ? 
      g3.toUpperCase() : 
      g1 + g2.toUpperCase(); 
  });
}

exports.createArticle = async (req, res) => {
  const inputData = {
    title: req.body.title,
    content: req.body.content,
    author: req.user.id,
  };

  const categoryText = beautifyString(req.body.category)

  const category = await Category.findOneAndUpdate(
    { description: categoryText },
    { description: categoryText },
    { upsert: true }
  );

  inputData.category = category._id;

  const article = await Article.create(inputData);

  res.status(201).json({
    message: 'Article created successfully',
    article,
  });
};

exports.fetchArticles = async (req, res) => {
  const findModifiers = {};

  const articles = await Article.find()
  .populate({
    path: 'author',
    model: 'User',
    select: '-password -createdAt -updatedAt'
  })
  .populate({
    path: 'category',
    model: 'Category',
    select: '-createdAt -updatedAt'
  }).sort('-createdAt').exec();

  res.status(200).json({
    message: 'Articles retrieved successfully',
    articles,
  });
};

exports.getArticleById = async (req, res) => {
  const { articleId } = req.params;
  const article = await Article.findOne({ _id: articleId });

  if (article) {
    res.status(200).json({
      message: 'Article retrieved successfully',
      article,
    });
  } else {
    res.status(404).json({
      message: 'Article not found',
    });
  }
};

exports.updateArticle = async (req, res) => {
  const { articleId } = req.params;
  const updateData = {};

  if (req.body.title) updateData.title = req.body.title;
  if (req.body.content) updateData.content = req.body.content;

  let category;
  if (req.body.category) {
    const categoryText = beautifyString(req.body.category)

    category = await Category.findOneAndUpdate(
      { description: categoryText },
      { description: categoryText },
      { upsert: true }
    );
  }

  if (category) updateData.category = category._id;

  const article = await Article
    .findOneAndUpdate({ 
    _id: articleId, author: req.user.id 
  }, updateData, { new: true })
  .populate({
    path: 'author',
    model: 'User',
    select: '-password -createdAt -updatedAt'
  })
  .populate({
    path: 'category',
    model: 'Category',
    select: '-createdAt -updatedAt'
  }).exec()

  if (article) {
    res.status(200).json({
      message: 'Article updated successfully',
      article,
    });
  } else {
    res.status(404).json({
      message: 'Article not found',
    });
  }
};

exports.deleteArticle = async (req, res) => {
  const { articleId } = req.params;

  const deletedArticle = await Article.findOneAndRemove({ 
    _id: articleId,
    author: req.user.id 
  });

  if (deletedArticle) {
    res.status(200).json({
      message: 'Article deleted successfully',
      deletedArticle
    });
  } else {
    res.status(404).json({
      message: 'Article not found',
    });
  }
};