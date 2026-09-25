const express=require('express');const path=require('path');const app=express();const PORT=process.env.PORT||3000;
app.use(express.static(__dirname));
app.get('/health',(req,res)=>res.json({ok:true,service:'Smart Dukan'}));
app.listen(PORT,()=>console.log(`Smart Dukan running on ${PORT}`));