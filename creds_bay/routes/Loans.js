const router =require('express').Router(),
      verify =require('./verifytokens'),
      {loanValidation}=require('../validations'),
      verifyagent=require('./verifyagent'),
      User=require('../models/Users'),
      Loan=require('../models/Loans');

// View Loans Info By Admin and Agent Only
router.get('/loans/view',verify,async(req,res)=>{
  try{
    Loan.find()
    .exec()
    .then(data=>{
      console.log(data);
      res.status(200).json({Loans:data});

    });
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }

});

// Edit Loan Request
 router.patch('/agent/loan/edit/:loan_req_id',verify,async(req,res)=>{

   try{

     //check loan status
     const loan_obj=await Loan.findOne({_id:req.params.loan_req_id});
     console.log(loan_obj);
     if(loan_obj.loan_state==='Accepted'){
       return res.status(400).send(`Cannot Edit Loan ID:${req.params.loan_req_id} , Loan Already Approved By Admin`);
     }

     // Update/Edit the Loan details
     const updateOps={};
     const options={new:true};
     if (req.body[0].propName==='loan_state' || req.body[0].propName==='_id' || req.body[0].propName==='customer_id' || req.body[0].propName==='agent_id'){
       return res.status(401).send(`You Dont have Permission to Alter ${req.body[0].propName}`);
     }
     for(const ops of req.body){
       updateOps[ops.propName]=ops.value;

     }
     const newLoan=await Loan.findByIdAndUpdate(req.params.loan_req_id, {$set:updateOps},options);
     res.status(200).json(newLoan);
     console.log(newLoan);

   }catch(err){
     console.log(err);
     res.status(400).send(err);
   }

 });

module.exports=router;
