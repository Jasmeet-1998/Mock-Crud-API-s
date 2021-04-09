// Validation
const Joi=require('@hapi/joi');



// register Validation
const registerValidation=(data)=>{

  const schema={
    name: Joi.string().min(6).required(),
    email:Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
    usertype: Joi.string().min(5).required()
  }
  return Joi.validate(data,schema);
}

// Login Validation
  const loginValidation=(data)=>{
    const schema={
      email: Joi.string().min(6).email().required(),
      password: Joi.string().min(6).required()
    }
    return Joi.validate(data,schema);
  }

// Loan Validation
const loanValidation=(data)=>{
  const schema={
     customer_id:Joi.string().required(),
     agent_id:Joi.string().required(),
     tenure_in_months:Joi.number().required(),
     interest:Joi.number().required(),
     //loan_state:Joi.string().required()
   }
   return Joi.validate(data,schema)
 }

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;
module.exports.loanValidation=loanValidation;
