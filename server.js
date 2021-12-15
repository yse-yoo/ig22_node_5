const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const uuidv4 = require('uuid').v4

const dotenv = require('dotenv');
dotenv.config();
const host = process.env.HOST
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

//サーバに接続(connection)したら
io.on('connection', (socket) => {
    socket.on('auth', (user) => {
        console.log(user)
    })
})

http.listen(port, host, () => {
    console.log('http://' + host + ':' + port)
})