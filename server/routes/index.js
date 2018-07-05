const router = require('express').Router();

// Import routes
const authRoutes = require('./auth-routes');
const usersRoutes = require('./users-routes');
const articlesRoutes = require('./articles-routes');
const categoriesRoutes = require('./categories-routes');

router.use('/', authRoutes);
router.use('/users', usersRoutes);
router.use('/articles', articlesRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;