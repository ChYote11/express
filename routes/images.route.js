const router = require('express').Router()
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, files, callback) {
      callback(null, './public/content_img/')
    },
    filename: function (req, files, callback) {
      callback(null, files.originalname)
    },
  })
  const upload = multer({ storage })
  const fs = require('fs')
  

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

router.post('/create', upload.array('files', 10), async function (req, res, next) {
    // console.log("tessssst")
    // console.log('yoww',req.files, req.body)

    console.log(req.body.images.length)

    try {
        console.log('image save function: ', req.body)
        let body = req.body;

        for(let  i = 0 ; i < body.images.length ; i++){
            let result = await images_db.save({
                img_path: body.images[i],
                book: {
                    book_id: body.book_id
                }
            })
        };
        res.json({status: 'success', data: result})
        // res.json({status: 'success'})

    } catch (e) {
        console.log(e.message)
        res.json({ status: "error" })
    }
})

module.exports = router
