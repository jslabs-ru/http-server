const http = require('http');
const router = require('find-my-way')();

const PORT = 3021;

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data.db',
    },
});

console.log('knex...', knex);

router.on('GET', '/', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.end('Main page');
})

router.on('GET', '/api/v1/users', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify([
        'Alice',
        'Robert',
        'John',
        'Lucy',
        'Michael'
    ]));
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
