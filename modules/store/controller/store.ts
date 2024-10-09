import {Request,Response} from "express";
import { Store } from "../../store/model/store";


export const allStore = async(req:Request,res:Response)=>{
  try{
    const data = await Store.findAll({})
    if (!data) {
      return res.status(404).send("Store not found");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}

export const oneStore = async(req:Request,res:Response)=>{
  try{
    const data = await Store.findOne({
      where:{
      id:req.params.id
      }
    })
    if (!data) {
      return res.status(404).send("Store not found");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}

export const addStore = async(req:Request,res:Response)=>{
  try{
    let{name,location}=req.body;
    const data = await Store.create({
      name:name,
      location:location
    });
    
    if (!data) {
      return res.status(404).send("Store Added");
    }
    res.status(200).json(data); 
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}


export const updateStore = async (req:Request, res:Response) => {
  try {
    const { name,location } = req.body;
    const { id } = req.params;
    const categoryToUpdate = await Store.findOne({
      where: { id }
    });
    if (!categoryToUpdate) {
      return res.status(404).send("Store not found");
    }

    const updated = await Store.update(
      { name,location },
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).send("Failed to update Store");
    }
    res.status(200).send("Store updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating the category");
  }
};



export const deleteStore = async(req:Request,res:Response)=>{
  try{
    let {id}=req.params
    const one = await Store.findOne({
      where: {
        id
      }
    });
    
    if (!one) {
      return res.status(404).send("Store not Found");
    }
    const found = await Store.destroy({
      where: {
        id
      }
    });
    
    if (!found) {
      return res.status(404).send("Data not Found");
    }
    res.status(200).json("Store Destroy");  
}
  catch(err){
    console.log(err);
    res.send("An Error Occured")
  }
}