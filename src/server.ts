import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRouter from "./users/auth.controller";
import userRouter from "./users/users.controllers";
import { validateToken } from "./users/auth.services";

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/users", validateToken, userRouter);

export default server;
