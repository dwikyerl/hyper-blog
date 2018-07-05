const router = require('express').Router();
const { usersControllers } = require('./../controllers');
const { articlesControllers } = require('./../controllers');
const { validateSignup, checkValidation } = require('./../middlewares/validation');
const authMiddlewares = require('./../middlewares/auth-middlewares');
const { catchErrors } = require('../handlers/errorHandlers');

router.post(
  '/signup',
  validateSignup,
  checkValidation,
  catchErrors(usersControllers.signup),
);

router.get(
  '/me',
  authMiddlewares.verifyToken,
  usersControllers.getUserInfo
);

router.get(
  '/:userId/articles',
  catchErrors(articlesControllers.fetchArticlesByUser)
)

module.exports = router;