import http from 'http';
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import * as helpers from './hard-computation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('one thread works');
    res.end();
  }

  if (req.url === '/multy') {
    const start = process.hrtime();

    helpers.default();

    const end = process.hrtime(start);

    res.write(JSON.stringify(end));
    res.end();
  }

  if (req.url === '/worker-multy') {
    const start = process.hrtime();
    const worker = new Worker(path.join(__dirname, 'hard-computation-multy.js'), { workerData: null });

    worker.on('message', (msg) => {
      res.write(msg);
      res.end();
    });

    worker.on('error', (err) => {
      res.end();
      throw err;
    });

    const end = process.hrtime(start);
    console.log('are we here');
  }
});

server.listen(3333);

console.log(`multy thread server is up on port: ${server.address().port}`);
