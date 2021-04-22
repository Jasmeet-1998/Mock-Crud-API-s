const router=require('express').Router(),
       Admin=require('../models/Admin.js'),
       Products=require('../models/product.json'),
       verify=require('../middleware/verifytokens.js');

const fs = require('fs');
const path=require('path');

 //Add Products
 router.post('/addProduct',verify, async (req,res)=>{
   try{
     //new product

     const prod_id=req.body.prod_id,
     prod_name=req.body.prod_name,
     prod_price=req.body.prod_price;

     if(!prod_id || !prod_name || !prod_price)return res.status(400).send('Please Provide prod_id,prod_name and prod_price to add new product');

     // to avoid duplicate products id and name
     console.log(prod_id in Products);


     // ==============PUSHING TO PRODUCTS ARRAY====================
     fs.readFile(path.join(__dirname,'../')+'models/product.json','utf-8',(err,data)=>{
       if(err){
         console.log(err);

       }else{
         try{


           const allProducts=JSON.parse(data);


           if(allProducts[`${prod_name}`]) return res.status(400).send('Product Name Already Used');

             // check the last index dynamically to avoid id duplication.
            if(prod_id in Products || prod_id===allProducts[allProducts.length-1].prod_id){
              return res.status(400).send('ID Already Used');
            }else{
              allProducts.push(
                  {
                    prod_id:prod_id,
                    prod_name:prod_name,
                    prod_price:prod_price
                  });
                fs.writeFile(path.join(__dirname,'../')+'models/product.json', JSON.stringify(allProducts,null,2),err=>{
                  if(err){
                    console.log(err);
                  }else{
                    return res.status(200).send('New Product added');
                  }
                });
              }


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

module.exports=router
