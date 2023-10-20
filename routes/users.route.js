const router = require('express').Router()

const user_db = require('../db/mysql.config').getRepository('User')


/* GET users listing. */
router.get('/', async function (req, res, next) {
  console.log('get all users called')
  let result = await user_db.find({

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
      console.log('user save function: ', req.body)
      let body = req.body
      const find_user = await user_db.count({
        where: {
          username: body.username
        }
      })
      if(find_user > 0){
        res.json({status: "error", msg: "used"})
      } else {
      let result = await user_db.save(body)
      
      res.json({status: 'success', data: result})
      }
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

router.post('/login', async function (req, res, next) {
  try {
      console.log('user save function: ', req.body)
      let body = req.body
      const find_user = await user_db.findOne({
        where: {
          username : body.username
        }
      })
   
      if(find_user){
        console.log('find user: ', find_user)
        if(find_user.password == body.password){
          console.log('login success')
          delete find_user.password
          res.json({status: "success", data: find_user})
        } else {
          console.log('invalid password')
          res.json({status: "error", msg: "invalid password"})
        }
      }else {
        console.log('username not found')
        res.json({status: "error", msg: "user not found"})
      }
  } catch (e) {
      console.log(e)
      res.json({ status: "error" })
  }
})



module.exports = router;
