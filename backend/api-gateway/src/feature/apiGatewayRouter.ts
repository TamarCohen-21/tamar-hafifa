import express from "express";
import itemRouter from "../item/itemRouter";
import orderRouter from "../order/orderRouter";

const router = express.Router();

router.use("/item", itemRouter);
router.use("/order", orderRouter);

export default router;
