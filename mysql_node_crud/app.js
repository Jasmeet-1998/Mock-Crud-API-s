const express=require('express'),
      app=express(),
      PORT=process.env.PORT || 3000,
      bodyParser=require('body-parser'),
      mysql=require('mysql');

app.use(bodyParser.json());

//MySQL Config
const mysqlConnection=mysql.createConnection({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.SECRET,
  database:process.env.DATABASE_NAME

});

//MySQL mysqlConnection
mysqlConnection.connect((err)=>{
  if(!err){
    console.log('MySQL Connection Established..');

  }
  else{
    console.log(`Something Went Wrong..\n Error ${JSON.stringify(err,undefined,2)}`);
  }
});

app.get('/',(req,res)=>{
  res.send('Started');
});


app.listen(PORT,process.env.IP,()=>{console.log(`Server started at Port ${PORT}`)});
