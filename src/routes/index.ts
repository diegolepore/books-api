import express from 'express'

// import routes here
import books from './api/books'
import users from './api/users'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Main api route')
})

routes.use('/books', books)
routes.use('/users', users)



export default routes