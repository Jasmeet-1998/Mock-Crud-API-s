const router =require('express').Router(),
      verify =require('./verifytokens'),
      {loanValidation}=require('../validations'),
      verifyagent=require('./verifyagent'),
      User=require('../models/Users'),
      Loan=require('../models/Loans');

// View all Customers Data
router.get('/agent/view',verify,async(req,res)=>{
  try{
    const users=await User.find({'usertype':'Customer'});
    console.log(users);
    res.status(200).json({customers:users});

  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }

});

// View Agents Data by email
router.get('/agent/view/:email',verify,async(req,res)=>{

    const email=req.params.email;
    const agent=await User.find({'email':email})
    .exec()
    .then(data=>{
      console.log(data[0]._id);
      res.status(200).json({agent_id:data[0]._id})
    })
    .catch(err=>
      {
        console.log(err);
        res.status(500).json({error:err});
      });
});

// Create Loan Request
router.post('/agent/loan/new',verifyagent,async(req,res)=>{

  // Loan Validation Check
  const {error}=loanValidation(req.body);
  if(error)return res.status(400).send(error.details[0].message);

  // Check for Duplication loan_requests for same customer

  const loanRequestExist=await Loan.findOne({customer_id:req.body.customer_id});
  //console.log(loanRequestExist);
  if(loanRequestExist) return res.status(400).send('Loan request Already Made for this Customer !!');

  try{
    // create new loan request
    const loan=new Loan({
      customer_id:req.body.customer_id,
      agent_id:req.body.agent_id,
      tenure_in_months:req.body.tenure_in_months,
      interest:req.body.interest,
      loan_state:'NEW'
    });

    //save to database
    const savedUser=await loan.save();
    res.send({loan_req_id:loan._id});
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }

});





module.exports=router;
