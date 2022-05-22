import { parentPort } from 'worker_threads';

function hardComputation() {
  const arr = new Array(2000000).fill().map(() => Math.random());

  arr.sort();

  parentPort.postMessage('worker is working!!!');
}

hardComputation();
