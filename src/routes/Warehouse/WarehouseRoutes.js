const router = require('express-promise-router')();
const controller = require('../../controllers/Warehouse/WarehouseController');

const passport = require('passport');
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', controller.getAll);
router.post('/', controller.new);

router.get('/:warehouseId', controller.get);
router.patch('/:warehouseId', controller.update);
router.delete('/:warehouseId', controller.delete);

router.get('/:warehouseId/products', controller.getProducts);

module.exports = router;
