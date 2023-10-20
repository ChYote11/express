var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('about', {
    //     title:"about me",
    //     name: 'Yote',
    //     age: "23",
    //     position: "dev?"
    // });
    res.json({
        message: 'test'
    })
});

module.exports = router;