//login with api endpoint
//jwt signed token recived
//use this token to issue a book.
const express=require('express'),
	  router=express.Router(),//.Router is the class that is capable of handling the Routes along with the validation like 404 error and stuff like that...
    jwt=require('jsonwebtoken'),
    bcrypt=require('bcryptjs'),//for encrypting passwords
    verify =require('./verifytoken'),
	  User=require('../models/User');

//login Customer and get auth-token
// customers/login
router.post('/login',async (req,res)=>{
  try{
    const email=req.body.email;
    const password=req.body.password;
    if(!email || !password) return res.status(401).send('Provide Password/Email');

    const customer=await User.findOne({email:email});
    if(!customer) return res.status(400).send('No Customer with the provided email In the Records.');

    //check user type
    if(customer.user_type!=='Customer'){
      return res.status(400).send('This is a Customer View Only Customers are Allowed!');
    }

    // password check
    const validPass=await bcrypt.compare(req.body.password,customer.password);
    if(!validPass) return res.status(400).send('Password is wrong.');

    //create and assign a token
    const token=jwt.sign({_id:customer._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);//add it to our header auth-token is arbitary name and spit it back

  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }

});

//for tommorow
// //View BookBanks route make it public no need of tokens or any auth redirect to a react componenst search bar
// router.post('/view',verify,async (req,res)=>{
//   try{
//
//   }catch(err){
//     console.log(err);
//     res.status(400).send(err);
//   }
//
// });

module.exports=router;
