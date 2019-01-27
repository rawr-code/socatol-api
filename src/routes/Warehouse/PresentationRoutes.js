const router = require('express-promise-router')();
const controller = require('../../controllers/Warehouse/PresentationController');

const passport = require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', controller.getAll);
router.post('/', controller.new);

router.get('/:presentationId', controller.get);
router.patch('/:presentationId', controller.update);
router.delete('/:presentationId', controller.delete);

module.exports = router;
