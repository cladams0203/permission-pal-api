import express from "express";
import helmet from "helmet";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

export default server;
