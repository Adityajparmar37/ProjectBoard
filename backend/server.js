const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbconnect = require('./config/database.config');
dotenv.config();
const studentRouters = require('./src/routers/student.router.js')
const projectRouters = require('./src/routers/project.routers.js')
const chatRouters = require('./src/routers/chat.routers.js')
const taskRouters = require('./src/routers/task.routers.js')
const fileRouters = require('./src/routers/file.routers.js');
const http = require('http');
const { Server } = require('socket.io');
const ChatGroup = require('./src/models/chatModal.js');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT;
dbconnect();

app.use(cors({
    credential: true,
    origin: ['http://localhost:5173']
}))

app.use("/api/student", studentRouters);
app.use("/api/project", projectRouters);
app.use("/api/chat", chatRouters);
app.use("/api/task", taskRouters);
app.use("/api/file", fileRouters);


//socket config
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("newMessage", (newMessage) => {
        socket.broadcast.emit("received-message", newMessage)
        console.log("New Message ==> ", newMessage);
    })

})

//Internal Error Handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

server.listen(PORT, () => {
    console.log(`serving on ${PORT}`);
})