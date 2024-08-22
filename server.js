const express = require('express');
require('./config/connect');
const app = express();
const routeuser = require ('./controller/C_user');
const routproduct = require ('./controller/C_product');
const routorder = require ('./controller/C_order')
const adminRouter = require('./admin');
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.use('/admin', adminRouter);

app.use('/user' , routeuser);
app.use('/product',routproduct);
app.use('/order',routorder);






app.listen(3000,()=>{

    console.log('Server Works');
})