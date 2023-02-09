import { BasicQueue } from './basic-queue.js';

export class AutoQueue {
  constructor() {
    this.queue = new BasicQueue();
  }
}

AutoQueue.prototype.enqueue = function(cb, name) {
  return new Promise((resolve, reject) => {
    this.queue.enqueue({ cb, resolve, reject, name });
    this.dequeue();
  })
}

AutoQueue.prototype.dequeue = function() {}
