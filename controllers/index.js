const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const projectRoute = require('./api/projectRoute');

router.use('/', homeRoutes);
router.use('/api', projectRoute);

module.exports = router;
