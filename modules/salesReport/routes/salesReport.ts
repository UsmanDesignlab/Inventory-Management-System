import express from "express";
import { all, one, add, update, destroy } from "../../salesReport/controller/salesReport";

const router = express.Router({ mergeParams: true });

router.get("/", all);
router.get("/:id", one);
router.post("/", add);
router.patch('/:id', update)
router.delete("/:id", destroy)


export default router;