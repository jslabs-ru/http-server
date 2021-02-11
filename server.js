const http = require('http');
const router = require('find-my-way')();

const PORT = 3021;

router.on('GET', '/', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({
        ok: 1
    }));
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
