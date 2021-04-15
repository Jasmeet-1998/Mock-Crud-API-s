module.exports=(req,res,next)=>{
  res.header('Content-Range','books 0-20/20')
  next()
}
//to handel content-range issue in react-admin.
