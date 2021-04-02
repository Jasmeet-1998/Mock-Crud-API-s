const mongoose=require('mongoose');


//Define Schema of Doctor
const userSchema=new mongoose.Schema({
  firstname:{
    type:String,
    required:true,
    max:20
  },
  lastname:{
    type:String,
    required:true,
    max:20

  },//need to add a dropdown in the views however enum acts as validator and restricts that only the array elements mentioned in enum are acceptable as input.
  hospitalname:{
    type:String,
    required:true,
    enum:[
      'Apollo Hospitals',
      'Jawaharlal Nehru College and Hospital',
      'Indira Gandhi Institute of Medical Sciences (IGIMS)',
      'AIIMS - All India Institute Of Medical Science'
    ]
  },
  email:{
    type:String,
    required:true,
    max:255,
    min:6

  },
  password:{
    type:String,
    required:true,
    max:1024,
    min:6
  },
  phone:{
    type:Number,
    required:false,
    min:10

  },
  pincode:{
    type:Number,
    required:false,
    min:6

  },
  state:{
    type:String,
    required:false,
    max:20

  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports=mongoose.model('User',userSchema);
