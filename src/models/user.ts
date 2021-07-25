// @ts-ignore
import client from "../database"
import bcrypt from 'bcrypt'

export type User = {
  id?: number,
  first_name?: string; 
  last_name?: string; 
  email: string; 
  password_digest: string;
}

const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env

const pepper = BCRYPT_PASSWORD
const saltRounds = (SALT_ROUNDS as unknown) as string

export class UserStore {
  async create(u: User): Promise<User | undefined> {
    try {
      const sql = 'INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(saltRounds)
      )

      console.log(hash)
      const result = await conn.query(sql, [u.first_name, u.last_name, u.email, hash])
      const user = result.rows[0]

      conn.release()

      return user
      // return

    } catch (error) {
      throw new Error(`Could not add new user. Error: ${error}`)
    }
  }

  async authenticate(email: string, password_digest:string): Promise<User | null> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE email=($1)'
      const result = await conn.query(sql, [email])

      console.log('password_digest+pepper: ', password_digest+pepper)


      if (result.rows.length) {
        const user = result.rows[0]
        console.log('user: ', user)

        if (bcrypt.compareSync(password_digest+pepper, user.password_digest)) {
          conn.release()
          return user
        }
      } 
      
      conn.release()
      return null
    } catch (error) {
      throw new Error(`Could not log the user in. Error: ${error}`)
    }
  }
}