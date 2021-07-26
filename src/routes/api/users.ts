import express from 'express'
import { User, UserStore } from '../../models/user'
import jwt from 'jsonwebtoken'

const store = new UserStore()

const users = express.Router()

// books.get('/', async (_req, res) => {
//   try {    
//     const books = await store.index()
//     res.json(books)
//   } catch (error) {
//     res.status(400)
//     res.json(error)
//   }
// })

users.post('/', async (req, res) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password_digest: req.body.password_digest
    }
    const u = await store.create(user)
    res.json(u)  
  } catch (error) {
    res.status(400)
    console.log(error)
    res.json(error)
  }
})

users.post('/auth', async (req, res) => {
  try {
    const user: User = {
      email: req.body.email,
      password_digest: req.body.password_digest
    }
    const u = await store.authenticate(user.email, user.password_digest)
    // @ts-ignore
    const token = jwt.sign({user: u}, process.env.TOKEN_SECRET)
    res.json(token)  
  } catch (error) {
    res.status(400)
    console.log(error)
    res.json(error)
  }
})

// books.get('/:id', async (req, res) => {
//   try {
//     const reqParamId = req.params.id
//     const book = await store.show(reqParamId)
//     res.json(book)  
//   } catch (error) {
//     res.status(400)
//     res.json(error)
//   }
// })

// books.put('/:id', async (req, res) => {
//   try {
//     const reqParamId = req.params.id
//     const reqBody: Book = {
//       title: req.body.title,
//       total_pages: req.body.total_pages,
//       author: req.body.author,
//       type: req.body.type,
//       summary: req.body.summary
//     }
//     const book = await store.edit(reqParamId, reqBody)
//     res.json(book)  
//   } catch (error) {
//     res.status(400)
//     res.json(error)
//   }
// })

// books.delete('/:id', async (req, res) => {
//   try {
//     const reqParamId = req.params.id
//     const book = await store.delete(reqParamId)
//     res.json(book)  
//   } catch (error) {
//     res.status(400)
//     res.json(error)
//   }
// })

export default users