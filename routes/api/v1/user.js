const express=require('express');
const router=express.Router();
const userApi=require('../../../controller/api/v1/login_Api');

router.post('/createUser',userApi.create);
router.post('/log',userApi.login);
module.exports=router;