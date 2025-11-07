const Router = require('express').Router()
const moviesController = require('../controllers/moviesController')

Router.get('/', moviesController.index)

Router.get('/:id', moviesController.show)


module.exports = Router