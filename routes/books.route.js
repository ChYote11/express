const router = require('express').Router()
const multer  = require('multer')

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/cover_img/')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    },
  })
  
const upload = multer({ storage })
const fs = require('fs')

const books_db = require('../db/mysql.config').getRepository('Books')

router.get('/call',async function (req, res, next) {
    console.log("call")
    console.log("filename1")
    const filename = '1711045834951image_picker_50EF7110-14E9-4B43-9658-6FE1E67E5F68-30198-000012CCC298DB3C.jpg';
    const filePath = path.join(__dirname, 'public', 'cover_img', filename);
    console.log(filePath);
    res.json({ status: 'success', data: filePath })
    res.sendFile(path.join(__dirname, '../public/cover_img', filename));
});

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

router.post('/create', upload.single('img'), async function (req, res, next) {
    // console.log('tettttttttt')
    // console.log('hello',req.file , req.body)

    try {
        // console.log('book save/ function: ', req.body)
        let body = req.body
        let result = await books_db.save(body)
        res.json({status: 'success', data: result})

    } catch (e) {
        console.log(e)
        res.json({ status: "error" })
    }
})

router.delete('/delete', async function (req, res, next) {
    try {
      console.log('item found', req.body)
      let body = req.body // รับ id จากพารามิเตอร์
      // console.log('user delete function: ', id);
      
      // ค้นหาข้อมูลตาม id ที่ระบุในฐานข้อมูล
      const find_item = await books_db.findOne({
  
        where: {
          book_id: body.book_id
        }
  
      });    // ถ้าไม่พบข้อมูล
      if (!find_item) {
        return res.json({status: "error", msg: "User not found"});
      } 
        console.log("deleted")
        // ลบข้อมูล
        const delete_item = await books_db.delete({
            book_id: body.book_id
        });
        // ส่งข้อมูลการลบกลับไป
        res.json({status: 'success', msg: 'User deleted successfully'});   
    } catch (e) {
      console.log(e)
      res.json({ status: "error" });
    }
  });
module.exports = router