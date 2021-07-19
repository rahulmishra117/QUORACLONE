const express=require('express');
const router=express.Router();
const userPostDB = require('../../../models/usersPostModel');
const {validateToken} = require('../v1/authMiddleware');



//get post create by user
router.get('/getpost', validateToken, async(req, res)=>{

    let userEmail = data.email;
    try{
        userPostData = await userPostDB.findOne({
            email:userEmail
        });
        //console.log(userPostData);
        if(userPostData){
            return res.json({
                data:{
                    Title:userPostData.postTitle,
                    Content:userPostData.postContent
                },
                error:null
            })
        }
        else{
            return res.json({
                data:`You haven't created any post yet`,
                error:null
            })
        }

    }catch(err){
        return res.json({
            data:null, 
            error:err.message
        });
    }

})


//create a new post
router.post('/addpost', validateToken, async(req, res)=>{

    let userPostData = {
        email:data.email,
        name:data.name,
        postTitle:req.body.title,
        postContent:req.body.content};
        

    try{
        let result = await userPostDB.create(userPostData);
        //console.log(result)
        return res.json({
            data:`Post with id: ${result._id} created successfully`,
            error:null
        })

    }catch(err){
        return res.json({
            data:null,
            error:err.message
        })
    } 
    


})


//update a post
router.post('/updatepost', validateToken, async(req, res)=>{
    try{
        
        let result = await userPostDB.updateOne({
            _id:req.body.id},
            {
                $set:
                {
                    postTitle:req.body.title, 
                    postContent:req.body.content
                }
        })
        console.log(result);
        return res.json({
            data:`Post updated successfully`,
            error:null
        }) 
        
    }catch(err){
        return res.json({
            data:null,
            error:err.message
        })
    }

})


//delete a post
router.delete('/deletepost', validateToken, async(req, res)=>{
    let postId = req.body.id;
    try{
        let result = await userPostDB.deleteOne({
            _id:postId
        });
        console.log(result);
        if(result.deletedCount!=0){
            return res.json({
                data:`Post with id:'${postId}' deleted successfully`,
                error:null
            })
        }else{
            return res.json({
                data:`Post with id:'${postId}' not found`,
                error:null
            })
        }
        
        
    }catch(err){
        return res.json({
            data:null,
            error:err.message
        })
    }
})



module.exports = router;