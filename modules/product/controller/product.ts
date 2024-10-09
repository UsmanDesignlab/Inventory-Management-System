import {Request,Response} from "express";
import { Products } from "../../product/model/product";


export const allProduct = async(req:Request,res:Response)=>{
  try{
    const data = await Products.findAll({})
    if (!data) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}

export const oneProduct = async(req:Request,res:Response)=>{
  try{
    const data = await Products.findOne({
      where:{
      id:req.params.id
      }
    })
    if (!data) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}

export const addProduct = async(req:Request,res:Response)=>{
  try{
    let{name,barcode,price,description}=req.body;
    const data = await Products.create({
      name:name,
      barcode:barcode,
      price:price,
      description:description
    });
    
    if (!data) {
      return res.status(404).send("Product Added");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}


export const updateProduct = async (req:Request, res:Response) => {
  try {
    const {name,barcode,price,description}= req.body;
    const { id } = req.params;
    const categoryToUpdate = await Products.findOne({
      where: { id }
    });
    if (!categoryToUpdate) {
      return res.status(404).send("Updates not found");
    }

    const updated = await Products.update(
      { name,barcode,price,description},
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).send("Failed to update product");
    }
    res.status(200).send("Product updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating the category");
  }
};



export const deleteProduct = async(req:Request,res:Response)=>{
  try{
    let {id}=req.params
    const one = await Products.findOne({
      where: {
        id
      }
    });
    
    if (!one) {
      return res.status(404).send("Product not Found");
    }
    const found = await Products.destroy({
      where: {
        id
      }
    });
    
    if (!found) {
      return res.status(404).send("Data not Found");
    }
    res.status(200).json("Product Destroy");  
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}