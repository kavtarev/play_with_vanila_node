export class BasicQueue {
  queue = [];
}

BasicQueue.prototype.enqueue = function(item) {
  this.queue.push(item);
}

BasicQueue.prototype.dequeue = function(item) {
  return this.queue.shift(item);
}


// const q = new BasicQueue();

// q.enqueue(1);
// q.enqueue(11);

// let res = q.dequeue()
// let res2 = q.dequeue()

// console.log(res, res2, res3);