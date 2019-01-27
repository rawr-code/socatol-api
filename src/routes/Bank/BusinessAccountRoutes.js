const router = require('express-promise-router')();
const controller = require('../../controllers/Bank/BusinessAccountController');

const passport = require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', controller.getAll);
router.post('/', controller.new);

router.get('/:businessAccountId', controller.get);
router.patch('/:businessAccountId', controller.update);
router.delete('/:businessAccountId', controller.delete);

module.exports = router;
