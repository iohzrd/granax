/**
 * Demonstrates how to take an ordinary node http server and expose it to the
 * Tor network as a hidden service!
 * @example
 */

"use strict";

const http = require("http");
const granax = require("..");

const options = {
  keyType: "NEW",
  keyBlob: "BEST",
};

async function main() {
  const server = http.createServer((req, res) => res.end("hello, tor!"));
  server.listen(0, "127.0.0.1");

  const tor = await granax();
  const data = await tor.createHiddenServicePromise(
    `127.0.0.1:${server.address().port}`,
    options
  );
  console.log(data);
}
main();
