const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Clients API']
    res.send('Clients API')});

router.use('/clients', require('./clients'));

module.exports = router;