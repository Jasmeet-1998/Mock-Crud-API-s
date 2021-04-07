const router =require('express').Router(),
      verify =require('./verifytokens'),
      User=require('../models/Users');

// View everyone
router.get('/admin/view',verify,(req,res)=>{
  //res.send(req.user);
  //.exec() makes it a promise
  User.find()
  .exec()
  .then(data=>{
    console.log(data);
    res.status(200).json({users:data});
  })
  .catch(err=>{
    console.log(err);
    res.status(400).send(err);
  })
});


module.exports=router;
