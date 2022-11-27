import mongoose from "mongoose";
import OrderInterface from "../order/orderInterface";
import config from "../config";
import Joi from "joi";

mongoose.connect(config.URL);
const Schema = mongoose.Schema;

const OrderSchema = new Schema<OrderInterface>({
  items: [
    { id: {type: mongoose.Schema.Types.ObjectId, required: true} ,
     units: {type: Number, required: true} ,_id: false}
  ],
  idNumber: { type: Number, required: true },
  date: { type: Date, default: new Date(), required: false },
});

export const OrderModel = mongoose.model("Order", OrderSchema);

export const joiSchema = Joi.object().keys({
  items: Joi.array().items(Joi.string()),
  date: Joi.date(),
});
