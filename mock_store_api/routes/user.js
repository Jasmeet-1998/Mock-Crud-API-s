const router=require('express').Router(),
      Products=require('../models/product.json'),
      verify=require('../middleware/verifytokens.js');

const fs=require('fs');
const path = require('path');


// Get all product
router.get('/showProducts',verify, async (req,res)=>{
  try{
    fs.readFile(path.join(__dirname,'../')+'models/product.json','utf-8',(err,data)=>{
      if(err){
        console.log(err);

      }else{
        try{
          const allProducts=JSON.parse(data);
          res.send(allProducts);

        }catch(err){
          console.log(`Error In parsing:${err}`)
        }
      }
    })
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
})

// Get product by prod_id
router.get('/showProducts/:id',verify, async (req,res)=>{
  try{
    fs.readFile(path.join(__dirname,'../')+'models/product.json','utf-8',(err,data)=>{
      if(err){
        console.log(err);

      }else{
        try{
          let id=req.params.id;
          if(!id)return res.status(400).send('Please Provide product Id!');

          const allProducts=JSON.parse(data);
          if(!allProducts[`${id-1}`])return res.status(400).send('No Product Found with this Product ID');
          res.send(allProducts[`${id-1}`]);

        }catch(err){
          console.log(`Error In parsing:${err}`)
        }
      }
    })
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
})

module.exports=router;
