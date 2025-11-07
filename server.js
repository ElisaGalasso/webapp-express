const express = require('express')
const app = express()
const PORT = 3000
const connection = require('./database/connection')

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.json('Welcome to webapp express');
})