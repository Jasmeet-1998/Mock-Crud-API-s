const router=require('express').Router(),
      User=require('../models/Users'),
      {registerValidation,loginValidation}=require('../validations'),
      jwt=require('jsonwebtoken'),
      bcrypt=require('bcrypt');

// New Customer Creation by Agent And Admin only.
router.post('/register/newUser',async (req,res) =>{

  //==================To be Included as Test Cases====================
  // Validating user info
  const {error}=registerValidation(req.body);
  if (!req.body.password) return res.status(400).send("Password is required..");
  // validation check
  if(error)return res.status(400).send(error.details[0].message);
  // check for duplication
  const emailExist=await User.findOne({email:req.body.email});
  if(emailExist) return res.status(400).send('Email Already Exists');

  // Hash the password
  const salt=await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(req.body.password,salt);

  // Create new User
  const user=new User({
    name:req.body.name,
    email:req.body.email,
    password:hashPassword,
    usertype:req.body.usertype
  });

  // Add user to the database
  try{
    const savedUser=await user.save();
    res.send({user_created:user._id});
  }catch(err){
    res.status(400).send(err);
  }
});


// Admin Login Route
router.post('/admin/login',async(req,res)=>{

   // Validation Check
   const {error}=loginValidation(req.body);
   if(error)return res.status(400).send(error.details[0].message);

   //Check wheather the user with the email exist in the database and is Agent Or Admin
   const user=await User.findOne({email:req.body.email});
   if(!user) return res.status(400).send('Email not found!!');

   if(user.usertype!=='Admin'){
     return res.status(400).send('Access Denied !! You must be Admin to do This..');
   }

   //PASSWORD Check from database
   const validPass=await bcrypt.compare(req.body.password,user.password);
   if(!validPass) return res.status(400).send('Password is wrong.');

   //create and assign a token
   const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{ expiresIn:'1h' });
   res.header('auth-token',token).send(token);//add it to our header auth-token is arbitary name and spit it back
});

module.exports=router;
