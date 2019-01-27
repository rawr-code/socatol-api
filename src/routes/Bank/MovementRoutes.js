const router = require('express-promise-router')();
const controller = require('../../controllers/Bank/MovementController');

const passport = require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', controller.getAll);
router.post('/', controller.new);

router.get('/:movementId', controller.get);
router.patch('/:movementId', controller.update);
router.delete('/:movementId', controller.delete);

module.exports = router;
