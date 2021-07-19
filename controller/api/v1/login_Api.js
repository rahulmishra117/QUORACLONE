const User=require('../../../models/user');
const jwt = require('jsonwebtoken');
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

// Creating the SignIn Api 

module.exports.login = async (req,res )=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(user){
            const isValidPassword = await user.isValidPassword(user,password);
            if(isValidPassword)
                    return res.status(200).json({
                        success:true,
                        message:"User authenticate",
                        data:{
                            token:jwt.sign(user.toJSON(),"secret",{
                                expiresIn:"1h",
                            })
                        }
                    })
        }
        return res.status(422).json({
                success:false,
                message:'Unauthorized'
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Error is found',
            error:err
        })
    }
}