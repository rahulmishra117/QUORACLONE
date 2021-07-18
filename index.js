const express=require('express');
const app = express();
const port=9000;
const db = require('./config/mongoose');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log('Error founc at the point', err);
        return;
    }
    console.log(`port is working ${port}`);
})