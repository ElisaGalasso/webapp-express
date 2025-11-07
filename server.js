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

app.get('/api/movies', (req, res) => {

    const sql = 'SELECT * FROM movies;'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        console.log(results);

        res.json({ results })

    })
})

app.get('/api/movies/:id', (req, res) => {

    const movieId = Number(req.params.id)
    console.log(req.params.id, movieId);

    const sql = 'SELECT * FROM movies WHERE id = ?'
    const reviewSql = 'SELECT * FROM reviews WHERE id = ?'

    connection.query(sql, [movieId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) return res.status(404).json({ message: 'Movie not found' })
        console.log(results);

        connection.query(reviewSql, [movieId], (reviewErr, reviewResults) => {
            if (reviewErr) return res.status(500).json({ error: err.message })

            const thisMovie = { ...results[0], Review: reviewResults }
            res.json(thisMovie)
        })

    })

})