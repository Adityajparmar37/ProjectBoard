const { Server } = require('socket.io');
const CryptoJS = require('crypto-js');
const ChatGroup = require('../models/chatModal.js');
const Message = require('../models/messageModal.js');
const dotenv = require('dotenv');
dotenv.config();

// Key
const encryptionKey = process.env.KeyCrypt;
// console.log(process.env.KeyCrypt)

const encryptMessage = (message) => {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
    const encryptedMessage = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(encryptionKey), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Concatenate the IV to the encrypted message
    return iv.concat(encryptedMessage.ciphertext).toString(CryptoJS.enc.Hex);
};

const decryptMessage = (encryptedMessage) => {
    const iv = CryptoJS.enc.Hex.parse(encryptedMessage.substring(0, 32)); // Extract IV from the encrypted message
    const ciphertext = CryptoJS.enc.Hex.parse(encryptedMessage.substring(32));

    const decryptedMessage = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, CryptoJS.enc.Utf8.parse(encryptionKey), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decryptedMessage.toString(CryptoJS.enc.Utf8);
};

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        const createChatRoom = async (project) => {
            try {
                const existingChat = await ChatGroup.findOne({ projectId: project._id });

                if (existingChat) {
                    console.log('Chat group already exists for projectId:', project._id);

                    const oldMessages = await Message.find({ chatRoom: existingChat._id })
                        .sort({ timestamp: 1 })
                        .lean()
                        .exec();

                    const decryptedOldMessages = oldMessages.map(msg => ({
                        ...msg,
                        content: decryptMessage(msg.content),
                    }));

                    socket.emit("old-messages", decryptedOldMessages);

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

                    io.emit("room-created", newChatGroup.projectName);

                    return newChatGroup._id.toString();
                }
            } catch (error) {
                console.error('Error creating or checking chat:', error.message);
            }
        };

        socket.on("CreateRoom", async (project) => {
            const roomId = await createChatRoom(project);
            console.log("ROOM ID ==> ", roomId);

            if (roomId) {
                const roomIdString = roomId.toString();
                socket.join(roomIdString);
                console.log(`${socket.id} joined the room ${roomIdString}`);
                io.to(roomIdString).emit("room-created", roomIdString);
            }
        });

        socket.on("newMessage", async (roomIdString, newMessage, studentId) => {
            try {
                const encryptedMessage = encryptMessage(newMessage);

                const message = new Message({
                    content: encryptedMessage,
                    sender: studentId,
                    chatRoom: roomIdString,
                });

                await message.save();

                const decryptedMessage = decryptMessage(encryptedMessage);

                io.to(roomIdString).emit("received-message", decryptedMessage);
                console.log("New Message ==> ", decryptedMessage, " ", roomIdString);
            } catch (error) {
                console.log("Error in saving message ", error);
            }
        });
    });
};
