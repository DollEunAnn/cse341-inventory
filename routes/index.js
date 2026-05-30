const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    
    if (req.query.logout === 'success') {
        return res.send('Logged out successfully!');
    }

    res.send('Hello World!');
});

router.use('/products', require('./productRoutes'));
router.use('/suppliers', require('./supplierRoutes'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(error) {
        if (error) {
            return next(error);
        }
        res.redirect('/?logout=success');
    });
});


module.exports = router;