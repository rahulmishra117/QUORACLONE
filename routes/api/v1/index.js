const express=require('express');
const router=express.Router();
const postR = require('../../../controller/api/services/usersPost');

router.use('/user',require('./user'));
router.use('/useraction', postR);
module.exports=router;