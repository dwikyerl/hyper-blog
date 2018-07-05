const router = require('express').Router();
const { articlesControllers } = require('./../controllers');
const { catchErrors } = require('../handlers/errorHandlers');

router.get(
  '/',
  catchErrors(articlesControllers.fetchCategories)
)

router.get(
  '/:categoryId/articles',
  catchErrors(articlesControllers.fetchArticlesByCategory)
)

module.exports = router;