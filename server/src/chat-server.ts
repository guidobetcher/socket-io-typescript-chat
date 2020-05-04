import express from "express";
import cors from "cors";
import * as http from "http";
import { Message } from "./model";
import SocketIO from "socket.io";

export class ChatServer {
  public static readonly PORT:number = 8080;
  private app: express.Application;
  private server: http.Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(cors());
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private sockets(): void {
    this.io = require("socket.io").listen(this.server, { origins: '*:*'});
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.io.on("connect", (socket: any) => {
      console.log("Connected client on port %s.", this.port);
      socket.on("message", (m: Message) => {
        console.log("[server](message): %s", JSON.stringify(m));
        this.io.emit("message", m);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });

      socket.on("joinToTheRoom", () => {
        socket.join('the room');
        console.log("Se han unido a la room");
      });
      socket.on("roomMessage", (m: Message) => {
        console.log("[server](message): %s", JSON.stringify(m));
        this.io.to('the room').emit("message", m);
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
