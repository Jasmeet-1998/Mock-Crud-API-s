const express=require('express'),
      app=express(),
      path=require('path'),
      dotenv=require('dotenv'),
      bodyParser=require('body-parser'),
      mongoose=require('mongoose'),
      adminRoute=require('./routes/admin'),
      agentRoute=require('./routes/agent'),
      userRoute=require('./routes/users'),
      loanRoute=require('./routes/Loans'),
      customerRoute=require('./routes/customers'),
      PORT=process.env.PORT || 3000;

dotenv.config();

// Connect to database
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true,useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log('------MongoDB Connected-----'))
.catch(err => console.log(err));



app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes
app.use('/credsBay/api',userRoute);
app.use('/credsBay/api',adminRoute);
app.use('/credsBay/api',agentRoute);
app.use('/credsBay/api',loanRoute);
app.use('/credsBay/api',customerRoute);

//set the view-engine autolookup for views directory ease of path access.
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//homeroute
app.get('/',(req,res)=>{
  res.render('Home');
});



app.listen(PORT,process.env.IP,()=>console.log(`Server Started...`));
