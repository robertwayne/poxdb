const fastify = require('fastify')({ logger: true })
const helmet = require('fastify-helmet')
const path = require('path')
const db = require('./db.js')

fastify.register(require('fastify-static'), {
    root: path.resolve('../client/build')
})

fastify.register(require('fastify-cors'), {
    origin: '*'
})

fastify.register(require('fastify-postgres'), {
    connectionString: db.DB_CONNECTION_STRING
})

fastify.get('/db', async (req, res) => {
    const client = await fastify.pg.connect()

    if (req.query.search) {
        const data = [req.query.search, req.query.limit || 5]
        const { rows } = await client.query(`
            SELECT p.id, p.name
            FROM body_part p
            WHERE p.name ILIKE '%' || $1 || '%'
            OR p.name ILIKE '% ' || $1 || '%'
            LIMIT $2;`, data)
        client.release()
        return rows
    } else if (req.query.itemID) {
        const data = [req.query.itemID]
        const { rows } = await client.query(`
        SELECT 
            p.id,
            p.name,
            p.description,
            p.short_name,
            type.name AS type_name,
            loc.name AS loc_name,
            freq.name AS freq_name,
            freq.description AS freq_desc,
            trigger.name AS trigger_name,
            trigger.description AS trigger_desc
        FROM body_part p
            INNER JOIN frequencies freq on freq.id = p.frequency
            INNER JOIN locations loc on loc.id = p.location
            INNER JOIN triggers trigger on trigger.id = p.trigger
            INNER JOIN types type on type.id = p.type
        WHERE p.id = $1;`, data)
        client.release()
        return rows[0]
    }
})

fastify.get('/', async (req, res) => {
    return res.sendFile('index.html')
})

const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`Server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()