const router =require('express').Router(),
      Loan=require('../models/Loans'),
      bcrypt=require('bcrypt'),
      User=require('../models/Users');

// View my Loan Information
router.post('/Customer/view/MyLoanStatus',async(req,res)=>{
  try{
    const email=req.body.email;
    const password=req.body.password;
    if(!email || !password) return res.status(401).send('Provide Password/Email');

    const customer=await User.findOne({email:email});
    if(!customer) return res.status(400).send('No Customer with the provided email In the Records.');

    const loan_details=await Loan.findOne({customer_id:customer._id});
    if(!loan_details) return res.status(400).send(`No Loan Requests Made for the customer ${customer.name} Please Contact an Agent.`);

    // password check
    const validPass=await bcrypt.compare(req.body.password,customer.password);
    if(!validPass) return res.status(400).send('Password is wrong.');

    console.log(loan_details);
    return res.status(200).send(loan_details);

  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }

});


module.exports=router;
