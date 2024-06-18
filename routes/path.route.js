const { token } = require('morgan');

const router = require('express').Router()

const path_db = require('../db/mysql.config').getRepository('Path')
const fs = require('fs')

router.post('/create', async function (req, res, next) {
    try {
        console.log('path save function: ', req.body)
        let body = req.body
        console.log(body)
        const find_user = await path_db.count({
          where: {
            user_id: body.user_id,
            book_id: body.book_id
          }
        })
        if(find_user > 0){
          res.json({status: "error", msg: "used"})
        } else {
        let result = await path_db.save(body)
        res.json({status: 'success', data: result})
        }
    } catch (e) {
        console.log(e)
        res.json({ status: "error" })
    }
  })

  router.get('/', async function (req, res, next) {
    console.log('get all path called')
    let result = await path_db.find({
    });

    if(result.length > 0){
        res.json({ status: 'success', data: result })
    }
    else{
        res.json({ status: 'error'})
    }
})
  module.exports = router
