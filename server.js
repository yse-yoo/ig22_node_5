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

//ユーザリスト
let users = {}

//サーバに接続(connection)したら
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        data.datetime = Date.now()
        io.emit('message', data)
    })

    socket.on('auth', (user) => {
        console.log(user)
        //Token がないときは終了
        if (user.token) return
        //Tokenを作成
        user.token = uuidv4()
        //ユーザリストに追加
        users[socket.id] = user

        //データをクライアントにかえす
        let data = { user: user, users: users }
        socket.emit('logined', data)
        //Boradcast でかえす
        socket.broadcast.emit('user_joined', data)
    })
})

http.listen(port, host, () => {
    console.log('http://' + host + ':' + port)
})