export const configureSockets = (io) => {
  console.log(`⚡ Socket.io Running on port ${process.env.PORT || 5000}`);

  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // 🔐 Already authenticated via middleware
    const user = socket.user;

    // 🔔 Welcome message (optional emit for greeting)
    socket.emit("connected-confirmation", {
      message: `Welcome ${user.name}! You are connected.`,
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        googleId: user.googleId, // optional if needed
      }
    });

    // 🎯 Handle room join
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`${user.name} joined room ${roomId}`);
    });

    // 💬 Handle message
    socket.on('sendMessage', (data) => {
      io.to(data.roomId).emit('receiveMessage', {
        user: {
          name: user.name,
          avatar: user.avatar
        },
        message: data.message,
      });
    });

    // ❌ Disconnect
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${user.name} (${socket.id})`);
    });
  });
};
