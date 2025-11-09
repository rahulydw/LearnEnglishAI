import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectDB from './config/connectDB.js';
import {socketAuthMiddleware} from './middleware/socketAuthMiddleware.js';
import { configureSockets } from './config/configureSockets.js';

const PORT = process.env.PORT || 5000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN,
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});
// Auth Check Middleware Socket
io.use(socketAuthMiddleware);
// Configure Socket.IO
configureSockets(io);

// Connect to MongoDB and start the server
connectDB().then(() => {
    try {
        console.log('Database connected successfully');
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error during server initialization:", error);
        process.exit(1); // Exit process with failure 
    }
});
