const { token } = require('morgan');

const router = require('express').Router()

const user_db = require('../db/mysql.config').getRepository('User')
const item_db = require('../db/mysql.config').getRepository('Items')


// /* GET users listing. */
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
          user_id: body.user_id
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
})

router.patch('/pluspoint',async function(req, res, next){
  // p = point+100
  try{
    console.log('user found', req.body)
    let body = req.body
    const find_user = await user_db.findOne({
      where:{
        user_id : body.user_id,
      }
    })
    const incr = await user_db.increment({user_id: body.user_id}, 'point', 300)
    console.log('increment res:', incr)
    if(incr){
      console.log('point: ', find_user.user_id)
      res.json({status:'success' ,msg:'found and + 100 point',})
    }
  }  catch (e) {
    console.log(e)
    res.json({ status: "error" })
  }
})

router.patch('/decreasepoint',async function(req, res, next){
  // p = point+100
  try{
    console.log('user found', req.body)
    let body = req.body
    const find_user = await user_db.findOne({
      where:{
        user_id : body.user_id
      }
    })
    const dcr = await user_db.decrement({user_id: body.user_id}, 'point', body.item_point)
    console.log('decrement res:', dcr)
    if(dcr){
      // console.log('point: ', find_user.user_id)
      res.json({status:'success' ,msg:'found and - amount of point',})
    }

  }  catch (e) {
    console.log(e)
    res.json({ status: "error" })
  }
})

router.delete('/delete', async function (req, res, next) {
  try {
    console.log('user found', req.body)
    let body = req.body // รับ id จากพารามิเตอร์
    // console.log('user delete function: ', id);
    
    // ค้นหาข้อมูลตาม id ที่ระบุในฐานข้อมูล
    const find_user = await user_db.findOne({

      where: {
        id: body.id
      }

    });    // ถ้าไม่พบข้อมูล
    if (!find_user) {
      return res.json({status: "error", msg: "User not found"});
    } 
      console.log("deleted")
      // ลบข้อมูล
      const delete_user = await user_db.delete({
          id: body.id
      });
      // ส่งข้อมูลการลบกลับไป
      res.json({status: 'success', msg: 'User deleted successfully'});   
  } catch (e) {
    console.log(e)
    res.json({ status: "error" });
  }
});

router.post('/login', async function (req, res, next) {
  try {
      console.log('user founded function: ', req.body)
      let body = req.body
      var find_user = await user_db.findOne({
        where: {
          username : body.user_id,
          // firstname : body.firstname
        }
      })
      if(find_user){
        // console.log('find user: ', find_user)
        console.log('firstname: ', find_user.displayname)
        if(find_user.password == req.body.password){
          console.log('login success')
          delete find_user.password
          delete find_user.user_id
          delete find_user.create_time

          var user = {
            user_id: find_user.user_id,
            firstname: find_user.displayname,
            imgUrl: find_user.imgUrl,
            point: find_user.point
          }

          console.log('new: ', user)
          res.json({status: "success",data1:find_user.user_id, data2: find_user.displayname, data3: find_user.imgUrl ,data4: find_user.point})
          console.log(find_user)
          return {
            status:"success",
            result: true,
            data: user,
            token: token
          }
        } else {
          console.log('invalid password')
          res.json({status: "error", msg: "invalid password"})
        }
      }
      else {
        console.log('username not found')
        res.json({status: "error", msg: "user not found"})
      }
  } catch (e) {
      console.log(e)
      res.json({ status: "error" })
  }
})

router.post('/test', async function (req, res, next) {
  let result = await user_db.update(20, {firstname: 'asd', lastname: 'fda'})
  res.json(result)
})


module.exports = router;
