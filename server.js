/**
 * Minimal fixed-response HTTP server in a single file: it answers every
 * request it receives with the same plain-text greeting. The file is
 * meaningful only as a process entry point - it exports nothing, so no
 * reusable API can be imported from it, and the built-in `http` module is
 * its only dependency.
 * @file
 * @module server
 */
const http = require('http');

/**
 * Hardcoded loopback bind address. Binding here is what sets the
 * reachability boundary: a client reaches the listener only by opening a
 * connection to it from inside the listener's own network namespace.
 * @constant {string}
 * @default '127.0.0.1'
 */
const hostname = '127.0.0.1';
/**
 * Hardcoded TCP port, with no fallback. Nothing reads an environment
 * variable, so if this port is already taken the program does not try
 * another one.
 * @constant {number}
 * @default 3000
 */
const port = 3000;

/**
 * The request listener. Handles every `request` event it receives
 * identically: `req` is never inspected, so no method, path, query string,
 * header, or body is read before the fixed response is written.
 * @function requestListener
 * @param {http.IncomingMessage} req Incoming request; never inspected.
 * @param {http.ServerResponse} res Response the fixed reply is written to.
 * @returns {void}
 * @example
 * $ curl -s http://127.0.0.1:3000/
 * Hello, World!
 */
const server = http.createServer((req, res) => {
  // Applies to every request the listener receives; `req` is never read.
  res.statusCode = 200;
  // No `charset` parameter is set, so the client chooses the encoding.
  res.setHeader('Content-Type', 'text/plain');
  // The body is 14 bytes, including the trailing newline.
  res.end('Hello, World!\n');
});

/**
 * Fires once, when the socket is bound, and writes the readiness line to
 * stdout. Nothing is written after it: there is no request log.
 * @function onListening
 * @listens http.Server#event:listening
 * @returns {void}
 */
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// No 'error' listener is registered, so a bind failure such as EADDRINUSE is
// fatal: the event goes unhandled and the process exits with a stack trace.
