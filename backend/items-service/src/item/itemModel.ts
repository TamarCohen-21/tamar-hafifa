import mongoose from "mongoose";
import ItemInterface from "./itemInterface";
import config from "../config";
import Joi from "joi";

const newUrl = config.URL + "/superMarket";
mongoose.connect(newUrl);
const Schema = mongoose.Schema;

const ItemsSchema = new Schema<ItemInterface>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  units: { type: Number, required: true },
  idNumber: { type: Number, required: true },
  imageUrl: {
    type: String,
    required: false,
    default:
      "https://flyclipart.com/thumb2/question-mark-png-icon-free-download-207720.png",
  },
});

export const ItemModel = mongoose.model("Item", ItemsSchema);

export const joiSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  units: Joi.number().min(0).required(),
  imageUrl: Joi.string(),
});
