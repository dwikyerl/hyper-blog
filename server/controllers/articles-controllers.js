const { Article, Category } = require('./../models');

exports.createArticle = async (req, res) => {
  const inputData = {
    title: req.body.title,
    content: req.body.content,
    author: req.user.id,
  };

  const categoryText = req.body.category.toLowerCase().replace(/([^a-z])([a-z])(?=[a-z]{2})|^([a-z])/g, (_, g1, g2, g3) =>{
    return (typeof g1 === 'undefined') ? 
      g3.toUpperCase() : 
      g1 + g2.toUpperCase(); 
  });

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