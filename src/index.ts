import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import BaseError from "./error/BaseError";
import routes from "./routes";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

routes(app)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof BaseError) {
    return res.status(error.statusCode).send({ message: error.message });
  }
  return res.status(500).send({ message: error.message });
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
