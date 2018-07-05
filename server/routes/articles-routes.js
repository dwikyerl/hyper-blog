const router = require('express').Router();
const { articlesControllers } = require('./../controllers');
const { validateAddArticle, checkValidation } = require('./../middlewares/validation'); 
const authMiddlewares = require('./../middlewares/auth-middlewares');
const { catchErrors } = require('../handlers/errorHandlers');

router.route('/')
  .post(
    authMiddlewares.verifyToken,
    validateAddArticle,
    checkValidation,
    catchErrors(articlesControllers.createArticle)
  )
  .get(
    catchErrors(articlesControllers.fetchArticles)
  )

module.exports = router;