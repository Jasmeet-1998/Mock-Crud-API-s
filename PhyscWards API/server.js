const dotenv=require('dotenv');
const server=require('express'),
      app=server(),
      bodyParser=require('body-parser'),
      PORT=process.env.PORT || 3000,
      mongoose=require('mongoose'),
      path=require('path'),
      doctorRoute=require('./routes/doctor');

dotenv.config();
//Connect to database
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true,useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));

//set the view-engine autolookup for views directory ease of path access.
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//homeroute
app.get('/physcwards/api',(req,res)=>{
  res.render('Home');
});

//to send post requests
app.use(server.json());
app.use(bodyParser.urlencoded({extended:true}));

//Doctor routes
app.use('/physcwards/api/doctor',doctorRoute);


app.listen(PORT,process.env.IP,()=>console.log(`Server Started at ${PORT}`));
