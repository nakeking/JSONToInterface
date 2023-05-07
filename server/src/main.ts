const express = require("express")
const routers = require('./routers')
const app = express()
app.use(routers)

const cors = require("cors")

app.use(cors())
app.listen(9527, () => {
    console.log(`Server listening on http://localhost:9527, Ctrl+C to stop`)
})

export {}
