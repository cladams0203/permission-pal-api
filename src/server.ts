import express from "express";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./users/auth.controller";
import userRouter from "./users/users.controller";
import schoolsRouter from "./schools/schools.controller";
import classesRouter from "./classes/classes.controller";
import formsRouter from "./forms/forms.controller";

import { validateToken } from "./users/auth.services";

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/users", validateToken, userRouter);
server.use("/api/schools", validateToken, schoolsRouter);
server.use("/api/classes", validateToken, classesRouter);
server.use("/api/forms", validateToken, formsRouter);

export default server;
