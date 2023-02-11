import { AutoQueue } from './auto-queue.js';

export class ParallelQueue extends AutoQueue {
  running = 0;

  constructor(limit) {
    super();
    this.limit = limit;
  }
}

ParallelQueue.prototype.dequeue = async function () {
  console.log('queue length', this.queue.queue.length);
  console.log('names in', this.queue.queue.map((item) => item.name));
  console.log('running process ', this.running);
  if (this.running >= this.limit) {
    console.log('limit is reached, wait in queue');
    return;
  }

  const item = this.queue.dequeue();
  if (!item) {
    console.log('produced by dequeue after last item in queue was shifted');
    return;
  }

  console.log('current item: ', item.name);

  try {
    this.running += 1;
    const res = await item.cb();
    const roo = await res.json();
    console.log(item.name, roo.id);
    item.resolve(roo.id);
    console.log(`${item.name}: amount of running processes ${this.running}`);
  } catch (e) {
    item.reject(e);
  } finally {
    this.running -= 1;
    this.dequeue();
  }
};

const boo = new ParallelQueue(2);

async function some(queue) {
  const first = await queue.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/1'), 'first');
  console.log(first);
}

async function any(queue) {
  const first = await queue.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/2'), 'second');
  console.log(first);
}

async function foo(queue) {
  const first = await queue.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/3'), 'third');
  console.log(first);
}

try {
  some(boo);
  any(boo);
  foo(boo);
  // const [first, second, third] = await Promise.all([
  //   boo.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/1'), 'first'),
  //   boo.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/2'), 'second'),
  //   boo.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/3'), 'third'),
  // ])

  //   const first = await boo.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/1'), 'first');
  //   const second = await  boo.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/2'), 'second');
  //   const third = await boo.enqueue(() => fetch('https://jsonplaceholder.typicode.com/users/3'), 'third');

  // console.log(999999, first);
} catch (e) {
  console.log(e);
}
