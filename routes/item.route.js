const router = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, files, callback) {
      callback(null, './public/item_img/')
    },
    filename: function (req, files, callback) {
      callback(null, files.originalname)
    },
  })
  const upload = multer({ storage })
  const fs = require('fs')

  const item_db = require('../db/mysql.config').getRepository('Items')

  router.get('/', async function (req, res, next) {
    console.log('get all items called')
    let result = await item_db.find({
    });

    if(result.length > 0){
        res.json({ status: 'success', data: result })
    }
    else{
        res.json({ status: 'error'})
    }
})

  router.post('/create', upload.single('img'), async function (req, res, next) {
    console.log('tettttttttt')
    console.log('hello',req.file , req.body)
    
    try {
      // console.log('book save/ function: ', req.body)
      let body = req.body
      let result = await item_db.save(body)
      res.json({status: 'success', data: result})
    
      } catch (e) {
          console.log(e)
          res.json({ status: "error" })
      }
    });

    router.delete('/delete', async function (req, res, next) {
      try {
        console.log('item found', req.body)
        let body = req.body // รับ id จากพารามิเตอร์
        // console.log('user delete function: ', id);
        
        // ค้นหาข้อมูลตาม id ที่ระบุในฐานข้อมูล
        const find_item = await item_db.findOne({
    
          where: {
            id: body.id
          }
    
        });    // ถ้าไม่พบข้อมูล
        if (!find_item) {
          return res.json({status: "error", msg: "User not found"});
        } 
          console.log("deleted")
          // ลบข้อมูล
          const delete_item = await item_db.delete({
              id: body.id
          });
          // ส่งข้อมูลการลบกลับไป
          res.json({status: 'success', msg: 'User deleted successfully'});   
      } catch (e) {
        console.log(e)
        res.json({ status: "error" });
      }
    });
module.exports = router
