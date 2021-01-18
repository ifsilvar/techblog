const router = require('express').Router();

const userRoutes = require('./user-routes');

const blogRoutes = require('./blogRoutes');

router.use('/blogs', blogRoutes);

router.use('/users', userRoutes);

module.exports = router;
