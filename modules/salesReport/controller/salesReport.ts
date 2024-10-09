import { Request, Response } from "express";
import { Sales } from "../../salesReport/model/salesReport";
import { Store } from "../../store/model/store";
import { Products } from "../../product/model/product";

export const all = async (req: Request, res: Response) => {
  try {
    const data = await Sales.findAll({});
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await Sales.findOne({
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
    const { storeId, productId, sales, profit, dateRange } = req.body
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
    const two = await Sales.create({
      storeId: storeId,
      productId: productId,
      sales: sales,
      profit: profit,
      dateRange: dateRange
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
    const { storeId, productId, profit, sales, dateRange } = req.body

    const three = await Sales.findOne({
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
    const two = await Sales.update({ storeId, productId, profit, sales, dateRange }, { where: { id } })
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
    const three = await Sales.findOne({
      where: {
        id: id
      }
    })
    if (!three) {
      return res.status(404).send("ID not found")
    }

    const data = await Sales.destroy({
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