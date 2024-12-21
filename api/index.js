import { Server } from "../src/app/app.js";


const server = new Server();
server.connect();
await server.connectDb();