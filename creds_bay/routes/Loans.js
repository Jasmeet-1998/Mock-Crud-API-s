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


     if(!req.params.loan_req_id) return res.status(400).send('Not valid loan_req_id');
     const agent_id=req.header('agent_id');
     if(!agent_id) return res.status(400).send('Invalid ID');

     console.log(req.header);
     const agent=await User.findOne({_id:agent_id});
     if(!agent) return res.status(400).send('No Agent Found!');

     if(agent.usertype!=='Agent'){
       return res.status(400).send('You are Not Authorized to this Only Agents are Allowed.');
     }

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
     //update the date automatically to new time.
     updateOps['date']=Date.now();
     const newLoan=await Loan.findByIdAndUpdate(req.params.loan_req_id, {$set:updateOps,},options);
     res.status(200).json(newLoan);
     console.log(newLoan);

   }catch(err){
     console.log(err);
     res.status(400).send(err);
   }

 });

 // Get Loan Information from date mentioned till now.

 router.get('/loan/view/byDate',verify,async(req,res)=>{

   try{


     const result=await Loan.find({date:{$lt:new Date(),$gt:new Date(req.body.by_date)}});
     if(!result) return res.status(400).send('No Loan Request Found In the Record');


     console.log(result);
     res.status(200).json(result);

   }catch(err){
     console.log(err);
     res.status(400).send(err);
   }

 });

module.exports=router;
