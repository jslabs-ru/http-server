const knex = require('knex')
const http = require('http');
const router = require('find-my-way')();

const PORT = 3021;
const USERS = 'users';

async function assertDatabaseConnection(database) {
    return database.raw('select 1+1 as result')
        .catch((err) => {
            console.log('[Fatal] Failed to establish connection to database! Exiting...');
            console.log(err);
            process.exit(1);
        });
}

async function startServer(db) {
    await assertDatabaseConnection(db);

    router.on('GET', '/', (request, response) => {
        response.setHeader('Content-Type', 'text/plain');
        response.end('Main page');
    })

    router.on('GET', '/api/v1/users', async (request, response, params) => {
        const users = await db(USERS);
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(users));
        response.end();
    })

    router.on('GET', '/api/v1/users/:id', async (request, response, params) => {
        const { id } = params;

        var user = await db(USERS).where('id', id);

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(user));
        response.end();
    })

    router.on('GET', '*', (request, response) => {
        response.setHeader('Content-Type', 'text/plain');
        response.end('Not found');
    })

    const server = http.createServer((request, response) => {
        router.lookup(request, response);
    })

    server.listen(PORT, err => {
        if (err) {
            throw err;
        } else {
            console.log(`Server listening on: http://localhost:${PORT}`);
        }
    })
}

startServer(knex({
    client: 'sqlite3',
    connection: {
        filename: './data.db',
    }
}));
