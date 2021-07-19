const jwt = require('jsonwebtoken');
const userdb = require('../../../models/user');


let salt = 'secret';

const validateToken = async(req, res, next) => {
    let userData;
    let token = req.headers.authorization;

    try{
        //token = token.split('Bearer ')[1];
       userData = jwt.verify(token.split('Bearer ')[1], salt);
    }catch(err){
        return res.json(
            {
                data:null,
                error:err.message
            }
        );
    }

    if(userData!=undefined){
        let email = userData.email;
        data= await userdb.findOne({email:email});
        if(data.length!=0){
            //console.log(data);
            next();
        }else{
            return res.json({
                data:null, 
                error:"Inavlid Token"
            })
        }

    }else{
        return res.json({
            data:null, 
            error:"Something went wrong"
        });
    }



}


module.exports = {validateToken};