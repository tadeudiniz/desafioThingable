const express = require('express')
const app = express()
const root = `${__dirname}/dist/desafio`
app.use(express.static(root))
app.listen(process.env.PORT || 9999)