import express from "express";
import { config } from "./config";
import morgan from "morgan";
import ApiGatewayRouter from "./feature/apiGatewayRouter";
import { errorHandler } from "./utils";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("", ApiGatewayRouter);
app.use(errorHandler);

app.listen(config.SERVER_PORT, () => {
  console.log(`ApiGateway listening on port ${config.SERVER_PORT}`);
});
