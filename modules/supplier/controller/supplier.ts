import {Request,Response} from "express";
import { Supplier } from "../../supplier/model/supplier";


export const allSupplier = async(req:Request,res:Response)=>{
  try{
    const data = await Supplier.findAll({})
    if (!data) {
      return res.status(404).send("Supplier not found");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}

export const oneSupplier = async(req:Request,res:Response)=>{
  try{
    const data = await Supplier.findOne({
      where:{
      id:req.params.id
      }
    })
    if (!data) {
      return res.status(404).send("Supplier not found");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}

export const addSupplier = async(req:Request,res:Response)=>{
  try{
    let{name,contactInfo,paymentDetails}=req.body;
    const data = await Supplier.create({
      name:name,
      contactInfo:contactInfo,
      paymentDetails:paymentDetails

    });
    
    if (!data) {
      return res.status(404).send("Supplier Added");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}


export const updateSupplier = async (req:Request, res:Response) => {
  try {
    const { name,contactInfo,paymentDetails } = req.body;
    const { id } = req.params;
    const categoryToUpdate = await Supplier.findOne({
      where: { id }
    });
    if (!categoryToUpdate) {
      return res.status(404).send("Store not found");
    }

    const updated = await Supplier.update(
      { name,contactInfo,paymentDetails },
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).send("Failed to update Store");
    }
    res.status(200).send("Supplier updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating the category");
  }
};



export const deleteSupplier = async(req:Request,res:Response)=>{
  try{
    let {id}=req.params
    const one = await Supplier.findOne({
      where: {
        id
      }
    });
    
    if (!one) {
      return res.status(404).send("Supplier not Found");
    }
    const found = await Supplier.destroy({
      where: {
        id
      }
    });
    
    if (!found) {
      return res.status(404).send("Data not Found");
    }
    res.status(200).json("Supplier Destroy");  
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}