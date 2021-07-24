import express from 'express'

// import routes here
import books from './api/books'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Main api route')
})

routes.use('/books', books)



export default routes