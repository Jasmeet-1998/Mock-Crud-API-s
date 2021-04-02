const router=require('express').Router(),
      Doctor=require('../models/Doctor'),
      {registerValidation}=require('../validations'),
      jwt=require('jsonwebtoken'),
      bcrypt=require('bcrypt');


//New Doctor Register Route '/physcwards/api/doctor/register/'
router.post('/register',async(req,res)=>{

  //Validating Doctor info
  const {error}=registerValidation(req.body);
  //validation check
  if(error)return res.status(400).send(error.details[0].message);

  //check for doctor duplicated email
  const emailExist=await Doctor.findOne({email:req.body.email});
  if(emailExist) return res.status(400).send('Email Already Exists');

  //Hash the password
  const salt=await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(req.body.password,salt);


  //Create new User
  const user=new Doctor({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    hospitalname:req.body.hospitalname,
    email:req.body.email,
    password:hashPassword,
    phone:req.body.phone,
    pincode:req.body.pincode,
    state:req.body.state
  });
  //Add  the new doctor details to database.
 try{
     const savedUser=await user.save();
     res.send({user_created:user._id});
   }catch(err){
      res.status(400).send(err);
    }
});

module.exports=router;
