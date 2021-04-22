const router=require('express').Router(),
      Admin=require('../models/Admin.js'),
      User=require('../models/User.js'),
      jwt=require('jsonwebtoken'),
      bcrypt=require('bcrypt');


// Admin Login Route
router.post('/admin/login',async(req,res)=>{

  try{

    if(req.body.name!==Admin.NAME){
      return res.status(401).send('Access Denied !! You must be Admin to do This..');
    }


    // Hash the password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(Admin.ADMIN_PASS,salt);

    //PASSWORD Check
    const validPass=await bcrypt.compare(req.body.password,hashPassword);
    if(!validPass) return res.status(400).send('Password is wrong.');

    //create and send token in response
    const token_secret=process.env.SECRET;
    const token=jwt.sign({ID:Admin.ID},token_secret);
    res.header('auth-token',token).send(token);

  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }


});

// User Login Route
router.post('/user/login',async(req,res)=>{
  try{

    if(req.body.name!==User.NAME){
      return res.status(401).send('Access Denied !! You must be User to do this');
    }

    // Hash the password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(User.USER_PASS,salt);

    //PASSWORD Check
    const validPass=await bcrypt.compare(req.body.password,hashPassword);
    if(!validPass) return res.status(400).send('Password is wrong.');

    //create and assign a token
    const token=jwt.sign({ID:User.ID},process.env.SECRET);
    res.header('auth-token',token).send(token);

  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }


});

module.exports=router;
