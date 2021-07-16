const express=require('express');
const app = express();
const port=9000;
app.listen(port,function(err){
    if(err){
        console.log('Error founc at the point', err);
        return;
    }
    console.log(`port is working ${port}`);
})