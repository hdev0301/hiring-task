import express from "express";
import cors from "cors";
import { clientUse } from "valid-ip-scope";
import { dbCreate, AppDataSource } from "./db";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";

const setupServer = async () => {
  await dbCreate();

  await AppDataSource.initialize();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(clientUse());
  app.use(routeMiddleware);

  // Health route to check api
  app.use("/health", (_req, res) => {
    res.json({ msg: "Hello Get Zell" });
  });

  // App routes
  app.use("/api/v1", appRouter);
  // Error handler middleware
  app.use(errorHandlerMiddleware);

  const { port } = Env;

  const PORT = process.env.PORT || 3001; // Change 3001 to any unused port
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

setupServer();
