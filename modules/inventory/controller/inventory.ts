import { Request, Response } from "express";
import { Inventory } from "../model/invetory";
import { Store } from "../../store/model/store";
import { Products } from "../../product/model/product";

export const all = async (req: Request, res: Response) => {
  try {
    const data = await Inventory.findAll({});
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await Inventory.findOne({
      where: {
        id
      }
    })
    if (!data) {
      return res.status(404).send("Data not found")
    }
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}

export const add = async (req: Request, res: Response) => {
  try {
    const { storeId, productId, quantity, damaged, received, shipped } = req.body
    const data = await Store.findOne({
      where: {
        id: storeId
      }
    })
    if (!data) {
      return res.status(404).send("Store not found")
    }
    const one = await Products.findOne({
      where: {
        id: productId
      }
    })
    if (!one) {
      return res.status(404).send("Product not found")
    }
    const two = await Inventory.create({
      storeId: storeId,
      productId: productId,
      quantity: quantity,
      damaged: damaged,
      received: received,
      shipped: shipped
    })
    if (!two) {
      return res.status(404).send("Not Entered Error")
    }
    res.status(200).send(two);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}


export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { storeId, productId, damaged, shipped, received, quantity } = req.body

    const three = await Inventory.findOne({
      where: {
        id: id
      }
    })
    if (!three) {
      return res.status(404).send("ID not found")
    }

    const data = await Store.findOne({
      where: {
        id: storeId
      }
    })
    if (!data) {
      return res.status(404).send("Order not found")
    }
    const one = await Products.findOne({
      where: {
        id: productId
      }
    })
    if (!one) {
      return res.status(404).send("Product not found")
    }
    const two = await Inventory.update({ storeId, productId, damaged, received, shipped, quantity }, { where: { id } })
    if (!two) {
      return res.status(404).send("Not Entered Error")
    }
    res.status(200).send("update Data");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const three = await Inventory.findOne({
      where: {
        id: id
      }
    })
    if (!three) {
      return res.status(404).send("ID not found")
    }

    const data = await Inventory.destroy({
      where: {
        id
      }
    })
    if (!data) {
      return res.status(404).send("Order not found")
    }
    res.status(200).send("Deleted")
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}