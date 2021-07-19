const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userPostSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true 
    },
    postTitle:{
        type:String,
        required:true
    },
    postContent:{
        type:String,
        required:true
    }
})



const UserPost=mongoose.model('UserPost',userPostSchema);
module.exports=UserPost;