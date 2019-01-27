const router = require('express-promise-router')();
const controller = require('../../controllers/Bank/BankController');

const passport = require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', controller.getAll);
router.post('/', controller.new);

router.get('/:bankId', controller.get);
router.patch('/:bankId', controller.update);
router.delete('/:bankId', controller.delete);

module.exports = router;
