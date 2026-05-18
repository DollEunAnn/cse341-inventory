const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/products', require('./productRoutes'));
router.use('/suppliers', require('./supplierRoutes'));

module.exports = router;