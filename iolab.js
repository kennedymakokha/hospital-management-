
import { Server } from 'socket.io'
// 

import User from './src/models/patientModel.js'
const Lab = (http) => {
    const io = new Server(http, {
        cors: {
            origin: ["http://localhost:3000", "https://learnnia.com"]
        }
    })
    let users = []


    const addUser = async (user_id, socket_id) => {
        const k = await User.findById(user_id)
        !users.some(user => user.user_id === user_id) &&
            users && users.push({ user_id, socket_id, name: k.firstname, surname: k.surname })
    };
    const RemoveUser = (socket_id) => {
        users = users.filter(user => {
            user.socket_id !== socket_id
        })
    }
    const getUser = (user_id) => {

        return users.find(user => user.user_id === user_id)
    }

    io.on('connection', socket => {
        socket.on("sent-message", message => {
            socket.broadcast.emit("recieve-message", message)
        })
        socket.on("sent-question", message => {
            console.log(message)
            socket.broadcast.emit("recieve-question", message)
        })
        socket.on("add_user", user => {

            addUser(user, socket.id)
        })
        socket.on('sentMessage', (data) => {
            const { senderId, recieverId, text, conversationId } = data
            const user = getUser(recieverId)
            if (user) {
                const t = { senderId, text, _id: conversationId }
                io.to(user.socket_id).emit("getMessage", t)
            }

        })
        io.emit("alluser", users)
    })
}
export default Lab