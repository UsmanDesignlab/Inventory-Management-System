import { Request,Response } from "express";
import { storeProduct } from "../../storeProducts/model/storeProduct";
import { Store } from "../../store/model/store";
import { Products } from "../../product/model/product";

export const all = async (req:Request, res:Response) => {
  try {
    const data = await storeProduct.findAll({});
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async(req:Request,res:Response)=>{
  try {
    const {id} =req.params
    const data = await storeProduct.findOne({where:{
      id
    }})
    if(!data){
     return res.status(404).send("Data not found")
    }
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}

export const add = async(req:Request,res:Response)=>{
  try {
    const {storeId,productId}=req.body
    const data = await Store.findOne({where:{
      id:storeId
         }})
    if(!data){
     return res.status(404).send("Store not found")
    }
    const one = await Products.findOne({where:{
       id:productId
    }})
    if(!one){
    return res.status(404).send("Product not found")
    }
    const two = await storeProduct.create({
        storeId:storeId,
        productId:productId,
      })
    if(!two){
    return res.status(404).send("Not Entered Error")
    }
    res.status(200).send(two);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}


export const update = async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
    const {storeId,productId}=req.body

     const three = await storeProduct.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await Store.findOne({where:{
        id:storeId
    }})
    if(!data){
     return res.status(404).send("Order not found")
    }
    const one = await Products.findOne({where:{
      id:productId
    }})
    if(!one){
    return res.status(404).send("Product not found")
    }
    const two = await storeProduct.update({ storeId,productId},{where:{id}})
    if(!two){
    return res.status(404).send("Not Entered Error")
    }
    res.status(200).send("update Data");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}


export const destroy = async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
     const three = await storeProduct.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await storeProduct.destroy({where:{
        id
    }})
    if(!data){
     return res.status(404).send("Order not found")
    }
    res.status(200).send("Deleted")
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}