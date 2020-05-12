import express from "express";
import cors from "cors";
import * as http from "http";
import SocketIO from "socket.io";
import {split} from "ts-node";

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

  // Creamos aplicacion express
  private createApp(): void {
    this.app = express();
    this.app.use(cors());
  }

  // Creamos servidor http
  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  // Configuración de puerto
  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  // Añadimos websockets al servidor
  private sockets(): void {
    this.io = require("socket.io").listen(this.server, { origins: '*:*'});
  }

  // Levantamos el servidor
  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    // Declaramos el evento "onConnect" que se ejecuta cuando un cliente se conecta mediante websockets
    this.io.on("connect", (socket: any) => {

      console.log("Connected client on port %s.", this.port);

      // Evento "on message" se ejecuta cuando se recive un mensaje de un cliente
      // Y lo emite al resto de clientes conectados
      socket.on("message", (m: any) => {
        console.log("[server](message): %s", JSON.stringify(m));
        this.io.emit("message", m);
      });

      // Evento que se ejecuta cuando un cliente se desconecta
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });

      // Este evento une al clente a una sala con el nombre que se le pasa como parametro
      // En este caso el nombre de las salas es el id del piso
      socket.on("joinToTheRoom", (room: string) => {
        socket.join(room);
        // TODO send a callback with the chat
        console.log("Se han unido a la room:" + room);
      });

      // Se recive un mensaje de un cliente y se emite solo a los componentes de la
      // Sala con nombre iguala a la id del piso
      socket.on("roomMessage", (message: string) => {
        console.log(message);
        const json = JSON.parse(message);
        console.log(`Estamos en el json ${json}`);
        this.io.to(json.room).emit("message", message);
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
