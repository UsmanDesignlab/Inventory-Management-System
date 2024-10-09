import express from "express";
import {allProduct,oneProduct,addProduct ,updateProduct,deleteProduct } from "../../product/controller/product";

const router = express.Router({ mergeParams: true });

router.get("/",allProduct);
router.get("/:id",oneProduct);
router.post("/",addProduct);
router.patch('/:id',updateProduct)
router.delete("/:id",deleteProduct)


export default router;