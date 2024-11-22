import { Server } from "./app/app.js";

const server = new Server();
server.connect();
await server.connectDb();