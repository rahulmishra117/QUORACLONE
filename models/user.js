const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true 
    },
    password:{

        type:String,
        required:true
    }
})

UserSchema.methods.isValidPassword= async function(user,password){
    const compare=await bcrypt.compare(password,user.password);
    return compare;
}


const User=mongoose.model('User',UserSchema);
module.exports=User;