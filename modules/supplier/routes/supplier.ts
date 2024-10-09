import express from "express";
import {allSupplier,oneSupplier,addSupplier ,updateSupplier,deleteSupplier } from "../../supplier/controller/supplier";

const router = express.Router({ mergeParams: true });

router.get("/",allSupplier);
router.get("/:id",oneSupplier);
router.post("/",addSupplier);
router.patch('/:id',updateSupplier)
router.delete("/:id",deleteSupplier)


export default router;