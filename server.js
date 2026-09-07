 * Minimal fixed-response HTTP server in one file: the request listener selects
 * the same status, media type, and greeting per `request` event; Node sends
 * no body for `HEAD`. A no-export entry point needing only built-in `http`.
 * @file
 * @module server
 */
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
