import express from 'express'
import { Book, BookStore } from '../../models/book'
import { verifyJWT } from '../../middleware/auth.middleware'

const store = new BookStore()

const books = express.Router()

books.get('/', verifyJWT, async (_req, res) => {
  try {    
    const books = await store.index()
    res.json(books)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
})

books.post('/', verifyJWT, async (req, res) => {
  try {
    const book: Book = {
      title: req.body.title,
      total_pages: req.body.total_pages,
      author: req.body.author,
      type: req.body.type,
      summary: req.body.summary
    }
    const b = await store.create(book)
    res.json(b)  
  } catch (error) {
    res.status(400)
    res.json(error)
  }
})

books.get('/:id', async (req, res) => {
  try {
    const reqParamId = req.params.id
    const book = await store.show(reqParamId)
    res.json(book)  
  } catch (error) {
    res.status(400)
    res.json(error)
  }
})

books.put('/:id', async (req, res) => {
  try {
    const reqParamId = req.params.id
    const reqBody: Book = {
      title: req.body.title,
      total_pages: req.body.total_pages,
      author: req.body.author,
      type: req.body.type,
      summary: req.body.summary
    }
    const book = await store.edit(reqParamId, reqBody)
    res.json(book)  
  } catch (error) {
    res.status(400)
    res.json(error)
  }
})

books.delete('/:id', async (req, res) => {
  try {
    const reqParamId = req.params.id
    const book = await store.delete(reqParamId)
    res.json(book)  
  } catch (error) {
    res.status(400)
    res.json(error)
  }
})

export default books