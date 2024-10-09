import { Request,Response } from "express";
import { supplierProduct } from "../../supplierProducts/model/supplierProduct";
import { Supplier } from "../../supplier/model/supplier";
import { Products } from "../../product/model/product";

export const all = async (req:Request, res:Response) => {
  try {
    const data = await supplierProduct.findAll({});
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async(req:Request,res:Response)=>{
  try {
    const {id} =req.params
    const data = await supplierProduct.findOne({where:{
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
    const {supplierId,productId}=req.body
    const data = await Supplier.findOne({where:{
      id:supplierId
         }})
    if(!data){
     return res.status(404).send("Supplier not found")
    }
    const one = await Products.findOne({where:{
       id:productId
    }})
    if(!one){
    return res.status(404).send("Product not found")
    }
    const two = await supplierProduct.create({
        supplierId:supplierId,
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
    const {supplierId,productId}=req.body

     const three = await supplierProduct.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await Supplier.findOne({where:{
        id:supplierId
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
    const two = await supplierProduct.update({ supplierId,productId},{where:{id}})
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
     const three = await supplierProduct.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await supplierProduct.destroy({where:{
        id
    }})
    if(!data){
     return res.status(404).send("Supplier not found")
    }
    res.status(200).send("Deleted")
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}