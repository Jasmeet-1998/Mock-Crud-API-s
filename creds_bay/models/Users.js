const mongoose=require('mongoose');


// Define Schema of Customer
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    max:20
  },
  email:{
    type:String,
    required:true,
    max:20

  },
  password:{
    type:String,
    required:true,
    max:1024,
    min:6
  },
  usertype:{
    type:String,
    required:true,
    enum:[
      'Agent',
      'Admin',
      'Customer'
    ]
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports=mongoose.model('User',userSchema);
