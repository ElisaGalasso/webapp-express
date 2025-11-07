const express = require('express')
const app = express()
const PORT = 3000
const moviesRouter = require('./routes/movies')

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {

    res.json('Welcome to webapp express');
})

app.use('/api/movies', moviesRouter)

app.use('/api/movies/:id', moviesRouter)