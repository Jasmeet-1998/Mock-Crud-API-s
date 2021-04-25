const mongoose=require('mongoose');


// Define Schema for Loans
const loanSchema=new mongoose.Schema({
  customer_id:{
    type:String,
    required:true
  },
  agent_id:{
    type:String,
    required:true
  },
  tenure_in_months:{
    type:Number,
    required:true
},
  interest:{
    type:Number,
    required:true,
    max:30,
    min:1
  },
  loan_state:{
    type:String,
    required:true,
    enum:[
      'NEW','ACCEPTED','REJECTED'
    ]
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports=mongoose.model('Loan',loanSchema);
