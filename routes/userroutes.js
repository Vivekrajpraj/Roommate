const express=require('express')
const router=express.Router()

const {registeruser,loginuser,getUsers}=require('../controlers/user')

router.post('/registeruser',registeruser)
router.post('/login',loginuser)
router.get('/allUsers',getUsers)

module.exports = router;
     