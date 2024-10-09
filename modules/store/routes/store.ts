import express from "express";
import {allStore,oneStore,addStore ,updateStore,deleteStore } from "../../store/controller/store";

const router = express.Router({ mergeParams: true });

router.get("/",allStore);
router.get("/:id",oneStore);
router.post("/",addStore);
router.patch('/:id',updateStore)
router.delete("/:id",deleteStore)


export default router;