const jwt=require('jsonwebtoken');

//Middleware function for protected routes pass controls to next only if the header has auth-token
module.exports= function (req,res,next){
  const token=req.header('auth-token');
  if(!token) return res.status(400).send('Access Denied auth-token missing in header');

  try{
    //CHECK TOKEN AUTHENTICITY
    const verified=jwt.verify(token,process.env.SECRET);
    req.user=verified;
    next();//so that the protected route function can be executed.

  }catch(err){
    res.status(400).send('Invalid Token');
  }
}
