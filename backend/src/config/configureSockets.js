export const configureSockets = (io) => {
    console.log(`Socket.io Running on port ${process.env.PORT || 5000}`);
    // Handle socket connections
    io.on('connection', (socket) => {
        console.log('✅ User connected:', socket.id);

        // Example event: join room
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);
        });

        // Example event: message
        socket.on('sendMessage', (data) => {
            io.to(data.roomId).emit('receiveMessage', {
                user: data.user,
                message: data.message,
            });
        });

        // Different File Link
        // Register all event handlers here
        // chatHandlers(io, socket);
        // userHandlers(io, socket);
        // notificationHandlers(io, socket);

        // Disconnect
        socket.on('disconnect', () => {
            console.log('❌ User disconnected:', socket.id);
        });
    });
};
