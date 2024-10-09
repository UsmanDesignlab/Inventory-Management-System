import express from "express";
import {allCustomer,oneCustomer,addCustomer ,updateCustomer,deleteCustomer } from "../../customer/controller/customer";

const router = express.Router({ mergeParams: true });

router.get("/",allCustomer);
router.get("/:id",oneCustomer);
router.post("/",addCustomer);
router.patch('/:id',updateCustomer)
router.delete("/:id",deleteCustomer)


export default router;