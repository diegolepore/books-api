// @ts-ignore
import client from "../database"

export type Book = {
  id?: number,
  title: string; 
  total_pages: number; 
  author: string; 
  type: string; 
  summary: string;
}

export class BookStore {
  async index(): Promise<Book[]> {
    try {
      const sql = 'SELECT * FROM books'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql)
      conn.release()
      console.log('✅ result.rows: ', result.rows)
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get books. Error: ${error}`)
    }
  }

  async show(id: string): Promise<Book> {
    try {
      const sql = 'SELECT * FROM books WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      console.log('✅ result.rows[0]: ', result.rows[0])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find book ${id}. Error: ${error}`)
    }
  }

  async create(b: Book): Promise<Book> {
    try {
      const sql = 'INSERT INTO books (title, total_pages, author, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [b.title, b.total_pages, b.author, b.type, b.summary])
      const book = result.rows[0]

      conn.release()

      return book

    } catch (error) {
      throw new Error(`Could not add new book ${ b.title }. Error: ${error}`)
    }
  }

  async edit(id: string, b: Book): Promise<Book> {
    // TO-DO
    // const bookFilteredObj = Object.assign({}, b)
    // console.log('bookFilteredObj', bookFilteredObj)
    // const formatedBookObj = Object.keys(bookFilteredObj).map((value) => {
    //   // @ts-ignore
    //   return bookFilteredObj[value]
    // })
    // console.log('formatedBookObj', formatedBookObj)

    try {
      const sql = `UPDATE books SET title=($2), total_pages=($3), author=($4), type=($5), summary=($6) WHERE id=($1) RETURNING *`
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [id, b.title, b.total_pages, b.author, b.type, b.summary])
      const book = result.rows[0]

      conn.release()

      return book
    } catch (error) {
      throw new Error(`Could not add new book ${ b.title }. Error: ${error}`)
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const sql = 'DELETE FROM books WHERE id=($1) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const book = result.rows[0]

      conn.release()

      return book
    } catch (error) {
      throw new Error(`Could not delete book with ID: ${ id }. Error: ${error}`)
    }
  }
}