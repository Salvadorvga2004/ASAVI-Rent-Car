const router = require('express').Router();

router.get('/',(req,res,next) => {
    res.send('hello word')
})

module.exports = router;