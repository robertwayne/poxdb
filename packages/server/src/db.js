require('dotenv').config()

const DB_CONNECTION_STRING = process.env.DATABASE_URL

module.exports = {
    DB_CONNECTION_STRING
}
