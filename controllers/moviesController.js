const connection = require('../database/connection')

function index(req, res) {

    const sql = 'SELECT * FROM movies;'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        console.log(results);

        res.json({ results })

    })
}

function show(req, res) {

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
}

module.exports = {
    index,
    show
}