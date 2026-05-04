const http = require('node:http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hello from Node.js\n',
    'This is a simple HTTP server that responds with a greeting message.\n'
  );
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
