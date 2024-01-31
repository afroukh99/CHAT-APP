import { Server } from "socket.io";

const io = new Server();

io.listen(5000, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });

};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

io.on("connection", (socket) => {
  socket.on('addUser', userId => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);

  });

  socket.on('sendMessage', ({ desc, sender, receiver,conversationId,img }) => {
    const user = getUser(receiver);
    user ?
      io.to(user.socketId).emit('getMessage', { desc, sender,conversationId,img })
      :
      console.log('Receiver not found')
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
