import { Request,Response } from "express";
import { Order } from "../../order/model/order";
import { Store } from "../../store/model/store";
import { Customer } from "../../customer/model/customer";


export const all = async (req:Request, res:Response) => {
  try {
    const data = await Order.findAll({});
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async(req:Request,res:Response)=>{
  try {
    const {id} =req.params
    const data = await Order.findOne({where:{
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
    const {customerId,storeId,status,shipmentDate}=req.body
    const data = await Store.findOne({where:{
      id:storeId
         }})
    if(!data){
     return res.status(404).send("Store not found")
    }
    const one = await Customer.findOne({where:{
       id:customerId
    }})
    if(!one){
    return res.status(404).send("customer not found")
    }
    const two = await Order.create({
        storeId:storeId,
        customerId:customerId,
        status:status,
        shipmentDate:shipmentDate
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
    const {storeId,customerId,status,shipmentDate}=req.body

     const three = await Order.findOne({where:{
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
    const one = await Customer.findOne({where:{
      id:customerId
    }})
    if(!one){
    return res.status(404).send("Customer not found")
    }
    const two = await Order.update({ storeId,customerId,status,shipmentDate},{where:{id}})
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
     const three = await Order.findOne({where:{
      id:id
    }})
    if(!three){
     return res.status(404).send("ID not found")
  }
  
    const data = await Order.destroy({where:{
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