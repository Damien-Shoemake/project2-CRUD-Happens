const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const bucketlistRoutes = require('./bucketlistRoutes');
const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboardRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use("/bucketlist", bucketlistRoutes)

module.exports = router;
