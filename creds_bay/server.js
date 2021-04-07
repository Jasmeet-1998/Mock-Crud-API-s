const express=require('express'),
      app=express(),
      dotenv=require('dotenv'),
      bodyParser=require('body-parser'),
      mongoose=require('mongoose'),
      adminRoute=require('./routes/admin'),
      userRoute=require('./routes/users'),
      PORT=process.env.PORT || 3000;

dotenv.config();

// Connect to database
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true,useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));



app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes
app.use('/credsBay/api',userRoute);
app.use('/credsBay/api',adminRoute);



app.get('/',(req,res,next)=>{
  res.send('Started');
});



app.listen(PORT,process.env.IP,()=>console.log(`Server Started at ${PORT}`));
