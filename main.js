const express = require('express');
const app = express();
const port = 4000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("user1-message", (message) => {
        io.emit("client1-message", message);
    })
})

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/login", (req, res) => {
    res.render("chat.ejs")
})


server.listen(port, () => {
    console.log(`App listening on port ${port}`);
})