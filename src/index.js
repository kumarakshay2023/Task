require("dotenv").config();
const express = require('express');
const app = express();
const superAdminRouter = require('./routes/superAdmin.route')
const adminRouter = require('./routes/admin.routes')
const userRouter = require('./routes/user.routes');
const cors = require('cors');
require("./models/index");


const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(cors());

app.use('/api/super-admin',superAdminRouter);
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter);

app.use((err, req, res, next) => {
    res.status(500).json({
        status:false,
        statusCode:err.statusCode||500,
        message:err.message
    })
})

app.use("/",(req,res)=>{
    res.send({status:false,statusCode:404})
})



app.listen(PORT,()=>{
    console.log('listening on port',PORT)
})