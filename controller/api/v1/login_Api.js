const User=require('../../../models/user');
const bcrypt = require('bcrypt');

module.exports.create = async(req,res)  => {
    try{
            const {email ,name,password}=req.body;
            const user= await User.findOne({email:email});
            if(user){
                return res.status(500).json({
                    message:'User already exits',
                    success:false
                })
            }
            req.body.password=await bcrypt.hash(password,10);
            const newUser=await User.create(req.body);
            return res.status(200).json({
                message:'Signup Successfull',
                user: newUser,
                success:true
            })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal Server Error',
            success:false,
            error:err
        })
    }
}