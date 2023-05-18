const express = require("express")
const routers = require('./routers')
const app = express()
app.use(routers)

const cors = require("cors")
app.use(cors())

import { Server } from "socket.io"
import { postChatGPT } from "./server/chatGPT"
const io = new Server(9528, {
    cors: {
        origin: "*"
    }
})

io.of("/jsonToInterface").on("connection", (socket) => {
    socket.on("message", (value: string) => {
        postChatGPT(value)
    })
})

app.listen(9527, () => {
    console.log(`Server listening on http://localhost:9527, Ctrl+C to stop`)
})

export {}
