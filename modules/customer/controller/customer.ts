import {Request,Response} from "express";;
import { Customer } from "../../customer/model/customer";


export const allCustomer = async(req:Request,res:Response)=>{
  try{
    const data = await Customer.findAll({})
    if (!data) {
      return res.status(404).send("Customer not found");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occurred")
  }
}

export const oneCustomer = async(req:Request,res:Response)=>{
  try{
    const data = await Customer.findOne({
      where:{
      id:req.params.id
      }
    })
    if (!data) {
      return res.status(404).send("Customer not found");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occurred")
  }
}

export const addCustomer = async(req:Request,res:Response)=>{
  try{
    let{name,contactInfo,email}=req.body;
    const data = await Customer.create({
      name:name,
      contactInfo:contactInfo,
      email:email
    });
    
    if (!data) {
      return res.status(404).send("Customer Added");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occurred")
  }
}


export const updateCustomer = async (req:Request, res:Response) => {
  try {
    const { name,contactInfo,email } = req.body;
    const { id } = req.params;
    const categoryToUpdate = await Customer.findOne({
      where: { id }
    });
    if (!categoryToUpdate) {
      return res.status(404).send("Customer not found");
    }

    const updated = await Customer.update(
      { name,contactInfo,email },
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).send("Failed to update Store");
    }
    res.status(200).send("Customer updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating the category");
  }
};



export const deleteCustomer = async(req:Request,res:Response)=>{
  try{
    let {id}=req.params
    const one = await Customer.findOne({
      where: {
        id
      }
    });
    
    if (!one) {
      return res.status(404).send("Customer not Found");
    }
    const found = await Customer.destroy({
      where: {
        id
      }
    });
    
    if (!found) {
      return res.status(404).send("Data not Found");
    }
    res.status(200).json("Customer Destroy");  
}
  catch(err){
    console.log(err);
    res.send("An Error Occurred")
  }
}