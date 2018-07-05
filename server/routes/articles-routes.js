const router = require('express').Router();
const { articlesControllers } = require('./../controllers');
const { validateAddArticle, 
        validateUpdateArticle,
        checkValidation 
      } = require('./../middlewares/validation'); 
const authMiddlewares = require('./../middlewares/auth-middlewares');
const { catchErrors } = require('../handlers/errorHandlers');
const { multer, sendUploadToGCS } = require('./../helpers/files');


router.route('/')
  .post(
    authMiddlewares.verifyToken,
    multer.single('image'),
    sendUploadToGCS,
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
    multer.single('image'),
    sendUploadToGCS,
    validateUpdateArticle,
    checkValidation,
    catchErrors(articlesControllers.updateArticle)
  )
  .delete(
    authMiddlewares.verifyToken,
    catchErrors(articlesControllers.deleteArticle)
  )

module.exports = router;