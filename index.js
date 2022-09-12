// Express
const app = require('express')()
const http = require('http')
const server = http.createServer(app)

// Socket.io
const { Server } = require('socket.io')
const io = new Server(server,{cors: {origin: '*'}})


io.on('connection', (socket) => {
    console.log('User ('+ socket.id +') connected')

    socket.on('userSendMessage', (message) => {
        console.log(message, socket.id);

        io.sockets.emit('userRecieveMessage', message, socket.id)
    })

    socket.on("disconnect", (socket) => {
        console.log('User disconnected')
    })
})

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})
