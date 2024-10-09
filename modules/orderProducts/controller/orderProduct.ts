import { Request, Response } from "express";
import { orderProduct } from "../../orderProducts/model/orderProduct";
import { Products } from "../../product/model/product";
import { Order } from "../../order/model/order";


export const all = async (req: Request, res: Response) => {
  try {
    const data = await orderProduct.findAll({});
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
};

export const one = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await orderProduct.findOne({
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
    const { orderId, productId } = req.body
    const data = await Order.findOne({
      where: {
        id: orderId
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
    const two = await orderProduct.create({
      orderId: req.body.orderId,
      productId: req.body.productId
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
    const { orderId, productId } = req.body

    const three = await orderProduct.findOne({
      where: {
        id: id
      }
    })
    if (!three) {
      return res.status(404).send("ID not found")
    }

    const data = await Order.findOne({
      where: {
        id: orderId
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
    const two = await orderProduct.update({ orderId, productId }, { where: { id } })
    if (!two) {
      return res.status(404).send("Not Entered Error")
    }
    res.status(200).send(two);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
}


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const three = await orderProduct.findOne({
      where: {
        id: id
      }
    })
    if (!three) {
      return res.status(404).send("ID not found")
    }

    const data = await orderProduct.destroy({
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