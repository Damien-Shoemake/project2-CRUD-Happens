const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const projectRoute = require('./api/projectRoute');
const apiRoutes = requrie('./api')
const dashboardRoutes = require('./dashboardRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
