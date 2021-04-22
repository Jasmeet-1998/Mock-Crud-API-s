const express=require('express'),
      app=express(),
      dotenv=require('dotenv'),
      bodyParser=require('body-parser'),
      authRoutes=require('./routes/authentication.js'),
      userRoutes=require('./routes/user.js'),
      adminRoutes=require('./routes/admin.js')
      PORT=process.env.PORT || 3000;

dotenv.config();


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//homeroute
app.get('/mockStore/api',(req,res)=>{
  res.send('Welcome to Mock Store API');
});

// Routes
app.use('/mockStore/api/auth',authRoutes);
app.use('/mockStore/api/user',userRoutes);
app.use('/mockStore/api/admin',adminRoutes);






app.listen(PORT,process.env.IP,()=>console.log(`Server Started at ${PORT}`));
