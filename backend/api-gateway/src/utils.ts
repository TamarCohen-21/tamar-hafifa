import { NextFunction, Response, Request } from "express";

export function errorWrapper(controllerProc: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    controllerProc(req, res).catch(next);
  };
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(err.status ? err.status : 500).send({ err: err.message });
}
