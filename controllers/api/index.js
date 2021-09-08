const router = require('express').Router();
const eventAttendRoutes = require('./event-attend-routes');
const eventRoutes = require('./event-routes');
const eventTagRoutes = require('./event-tag-routes');
const userRoutes = require('./user-routes');

//http:localhost:3001/api
router.use('/eventAttend', eventAttendRoutes);
router.use('/event', eventRoutes);
router.use('/eventTag', eventTagRoutes);
router.use('/users', userRoutes);

module.exports = router;