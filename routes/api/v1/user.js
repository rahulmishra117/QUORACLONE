const express=require('express');
const router=express.Router();
const userApi=require('../../../controller/api/v1/login_Api');

router.post('/createUser',userApi.create);
module.exports=router;