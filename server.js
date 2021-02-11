const http = require('http');
const router = require('find-my-way')();

const PORT = 3021;
const USERS = 'users';

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data.db',
    },
});

router.on('GET', '/', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.end('Main page');
})

router.on('GET', '/api/v1/users', async (request, response, params) => {
    const users = await knex(USERS);
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(users));
    response.end();
})

router.on('GET', '/api/v1/users/:id', async (request, response, params) => {
    const { id } = params;

    var user = await knex(USERS).where('id', id);

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
