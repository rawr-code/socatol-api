const router = require('express-promise-router')();
const controller = require('../../controllers/Warehouse/ProductController');

const passport = require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', controller.getAll);
router.post('/', controller.new);

router.get('/:productId', controller.get);
router.patch('/:productId', controller.update);
router.delete('/:productId', controller.delete);

module.exports = router;
