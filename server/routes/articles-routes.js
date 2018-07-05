const router = require('express').Router();
const { articlesControllers } = require('./../controllers');
const { validateAddArticle, 
        validateUpdateArticle,
        checkValidation 
      } = require('./../middlewares/validation'); 
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

router.route('/:articleId')
  .get(
    catchErrors(articlesControllers.fetchArticleById)
  )
  .put(
    authMiddlewares.verifyToken,
    validateUpdateArticle,
    checkValidation,
    catchErrors(articlesControllers.updateArticle)
  )
  .delete(
    authMiddlewares.verifyToken,
    catchErrors(articlesControllers.deleteArticle)
  )

module.exports = router;