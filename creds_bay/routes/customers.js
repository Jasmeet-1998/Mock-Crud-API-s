const router =require('express').Router(),
      Loan=require('../models/Loans'),
      bcrypt=require('bcrypt'),
      User=require('../models/User');

// View my Loan Information
router.get('/loans/Customer/viewStatus/:loan_id',async(req,res)=>{
  try{
    const email=req.body.name;
    const password=req.body.password;
    if(!email || !password) return res.status(401).send('Provide Password/Email');

    const customer=await User.findOne({email:email});
    const loan_details=await Loan.findOne({_id:req.params.loan_id});
    if(!loan_details) return res.status(400).send('No Records Found!');

    // password check
    const validPass=await bcrypt.compare(req.body.password,customer.password);
    if(!validPass) return res.status(400).send('Password is wrong.');

    console.log(loan_details);
    return res.status(200).send(json(loan_details));

  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }

});


module.exports=router;
