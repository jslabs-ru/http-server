const http = require('http');

const PORT = 3021;

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({
        ok: 1
    }));
    response.end();
})

server.listen(PORT, err => {
    if (err) {
        throw err;
    } else {
        console.log(`Server listening on: http://localhost:${PORT}`);
    }
})
