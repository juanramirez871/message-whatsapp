import { Express } from "express";
import "dotenv/config";

export const createServer = (app: Express, port: number): void => {
  app.listen(port, () => {
    console.log(`server listening... http://localhost:${port}`);
  });
};
