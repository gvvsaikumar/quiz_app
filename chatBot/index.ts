import express, { Express } from "express";
import path from "path";
import { Server, Socket } from "socket.io";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 4000;

const server = app.listen(PORT, () =>
  console.log(`💬 server on port localhost:${PORT} `)
);

app.use(express.static(path.join(__dirname, "public")));
let socketsConnected = new Set()
const io: Server = new Server(server);

io.on("connection", (socket: Socket) => {
  onConnected(socket);
});

function onConnected(socket: Socket): void {
  console.log(socket.id)
  socketsConnected.add(socket.id)
  io.emit('clients-total',socketsConnected.size)

  socket.on('disconnect',()=>{
    console.log('socket disconnected',socket.id)
    socketsConnected.delete(socket.id)
    io.emit('clients-total',socketsConnected.size)
  })

  socket.on('message',(data)=>{
    console.log(data)
    socket.broadcast.emit('chat-message',data)
  })
  socket.on('feedback',(data)=>{
    socket.broadcast.emit('feedback',data)
  })
}
