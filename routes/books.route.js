const router = require('express').Router()

const books_db = require('../db/mysql.config').getRepository('Books')



router.get('/', async function (req, res, next) {
    console.log('get all books called')
    let result = await books_db.find({
        relations: {
            images: true
        },
        // select: {
        //     book_id : true,
        //     name: true,
        //     images: {
        //         img_id: true
        //     }
        // }
    });

    if(result.length > 0){
        res.json({ status: 'success', data: result })
    }
    else{
        res.json({ status: 'error'})
    }
})

router.post('/create', async function (req, res, next) {
    try {
        console.log('book save function: ', req.body)
        let body = req.body
        let result = await books_db.save(body)
        res.json({status: 'success', data: result})
    } catch (e) {
        console.log(e)
        res.json({ status: "error" })
    }
    // console.log('result :' , result.book_id)
    // try{
    //     img_list = [
    //         {img_path:"image/Metro Forest  /IMG_0438.jpg",book: {book_id:result.book_id}},
    //         {img_path:"image/Metro Forest  /IMG_0439.jpg",book: {book_id:result.book_id}},
    //         {img_path:"image/Metro Forest  /IMG_0440.jpg",book: {book_id:result.book_id}},
    //     ]
    //     let image_result = await images_db.save(img_list)
    // }catch(e){
    //     console.log(e)
    // }
})
module.exports = router