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
const Message = require('./src/models/messageModal.js');

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

    // Function to handle room creation
    const createChatRoom = async (project) => {
        try {
            const existingChat = await ChatGroup.findOne({ projectId: project._id });

            if (existingChat) {
                console.log('Chat group already exists for projectId:', project._id);

                // Retrieve old messages for the room
                const oldMessages = await Message.find({ chatRoom: existingChat._id })
                    .sort({ timestamp: 1 })
                    .lean()
                    .exec();

                // Emit old messages to the connected client
                socket.emit("old-messages", oldMessages);

                return existingChat._id;
            } else {
                const newChatGroup = await ChatGroup.create({
                    projectName: project.projectTitle,
                    projectId: project._id,
                    members: project.projectMembers.map(member => ({
                        userId: member.memberId,
                        name: member.memberName,
                    })),
                });

                console.log('Chat saved:', newChatGroup);

                // Emit an event to notify clients that the room has been successfully created
                io.emit("room-created", newChatGroup.projectName);

                return newChatGroup._id.toString();
            }
        } catch (error) {
            console.error('Error creating or checking chat:', error.message);
        }
    };

    socket.on("CreateRoom", async (project) => {
        // console.log("Project Name ==> ", project);


        const roomId = await createChatRoom(project);
        console.log("ROOM ID ==> ", roomId);

        // Join the socket to the room
        if (roomId) {
            const roomIdString = roomId.toString();
            socket.join(roomIdString);
            console.log(`${socket.id} joined the room ${roomIdString}`);
            io.to(roomIdString).emit("room-created", roomIdString);
        }
    });

    socket.on("newMessage", async (roomIdString, newMessage, studentId) => {
        try {
            const message = new Message({
                content: newMessage,
                sender: studentId,
                chatRoom: roomIdString,
            });

            await message.save();
            io.to(roomIdString).emit("received-message", newMessage);
            console.log("New Message ==> ", newMessage, " ", roomIdString);
        } catch (error) {
            console.log("Error in saving message ", error);
        }
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