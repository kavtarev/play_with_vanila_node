import * as http from 'http';
import { HardComputation } from '../computations/hard-computation.js';

const server = http.createServer((req, res) => {
  const result = HardComputation();

  res.end(`${result.length}`);
});

server.listen(3000, () => console.log('we are up on 3000'));
