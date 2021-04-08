const jwt=require('jsonwebtoken');
const User=require('../models/Users');

//Middleware function for protected routes pass controls to next only if the header has auth-token
module.exports= async(req,res,next)=>{
  const token=req.header('auth-token');
  if(!token) return res.status(400).send('Access Denied');


  const user=await User.findOne({_id:req.body.agent_id});
  if(!user) return res.status(400).send('Bad Request Cannot Fetch Data!');


  //console.log(user);
  if(user.usertype!=='Agent'){
    return res.status(400).send('Access Denied !! You must be Agent to do This..');
  }


  try{
    //CHECK TOKEN AUTHENTICITY
    const verified=jwt.verify(token,process.env.TOKEN_SECRET);
    req.user=verified;
    next();//so that the protected route function can be executed.

  }catch(err){
    res.status(400).send('Invalid Token');
  }
}
