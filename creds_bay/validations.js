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

// New Patient Validation
// const patientValidation=(data)=>{
//
//
//   const schema={
//     name:Joi.string().min(3).required(),
//     doctor_appointed:Joi.string().min(3).required(),
//     address:Joi.string().min(10).required(),
//     phone:Joi.number().min(10),
//     email:Joi.string().min(6).email().required(),
//     password:Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,15}$')),
//     //image:Joi.string().required()
//
//   }
//   return Joi.validate(data,schema)
// }

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;
//module.exports.patientValidation=patientValidation;
