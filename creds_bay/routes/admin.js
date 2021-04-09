const router =require('express').Router(),
      verify =require('./verifytokens'),
      User=require('../models/Users'),
      Loan=require('../models/Loans');

// View entire database (THIS ROUTE IS JUST FOR DEBUGGING PURPOSES CAN BE REMOVED BEFORE THE API GOES TO FINAL PRODUCTION.)
router.get('/admin/view/:admin_id',verify,async(req,res)=>{

  const admin_id=req.params.admin_id;
  const admin=await User.findOne({_id:admin_id});
  if(!admin) return res.status(400).send('No records Found in the database regarding this ID.');

  //console.log(admin);
  if(admin.usertype!=='Admin'){
    return res.status(400).send('Not Allowed you must be Admin to Perform this Action!');
  }
  try{
    User.find()
    .exec()
    .then(data=>{
      console.log(data);
      res.status(200).json({users:data});
    });

  }catch(err){
    res.status(400).send(err);
  }

});

// Approve loan Request
router.patch('/admin/loanApproval/:loan_req_id',verify,async(req,res)=>{
  try{
    const admin_id=req.body.admin_id;
    const admin=await User.findOne({_id:admin_id});
    if(!admin) {
      return res.status(400).send('No Records Found!')
    };
    console.log(admin);

    if(admin.usertype!=='Admin'){
      return res.status(400).send('Only Admin Can Approve Loans Please Contact Admin !');
    }

    const updates=req.body.loan_decision;
    console.log(updates);
    const valid= ["Accepted","Rejected"].includes(updates);
    if(!valid) return res.status(400).send('Only Allowed Values for loan_decision are "Accepted" or "Rejected"');


    const options={new:true};
    //options are compulsary if you want to get the updated collection.
    const newLoan=await Loan.findByIdAndUpdate(req.params.loan_req_id, {$set:{'loan_state':updates}},options);
    res.status(200).json(newLoan);
    console.log(newLoan);

  }catch(err){
    res.status(400).send(err);
  }

});


module.exports=router;
