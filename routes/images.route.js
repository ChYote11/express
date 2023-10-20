const router = require('express').Router()

const images_db = require('../db/mysql.config').getRepository('Images')

router.get('/', async function (req, res, next) {
    console.log('get all images called')
    let result = await images_db.find({
        relations: {
            book: true
        },
        // select: {
        //     book : {
        //         book_id: true,
        //         name: true
        //     }
        // }
    });
    res.json({ status: 'success', data: result })
})

router.post('/create', async function (req, res, next) {
    try {
        console.log('image save function: ', req.body)
        let body = req.body
        let result = await images_db.save({
            img_path: body.img_path,
            book: {
                book_id: body.book_id
            }
        })
        res.json({status: 'success', data: result})
    } catch (e) {
        console.log(e)
        res.json({ status: "error" })
    }
})

module.exports = router
