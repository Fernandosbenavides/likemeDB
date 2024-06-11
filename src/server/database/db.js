import pkg from 'pg'

const {Pool} = pkg

const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_DATABASE,
    allowExitOnIdle: true
}

const pool = new Pool(config)

const db = (query, values) => pool.query(query, values)
  .then(({ rows }) => rows)
  .catch(({ code, message }) => {
    const error = { status: false, code, message };
    throw error;
  });

export default db;