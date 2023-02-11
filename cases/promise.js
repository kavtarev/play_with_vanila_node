const MyPromiseStatus = {
  pending: 'pending',
  rejected: 'rejected',
  fulfilled: 'fulfilled',
};

class MyPromise {
  result;

  status = MyPromiseStatus.pending;

  #resolveCbs = [];

  #rejectCbs = [];

  constructor(func) {
    try {
      func(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (e) {
    }
  }

  #resolve(data) {
    if (this.status === MyPromiseStatus.pending) {
      this.result = data;
      this.status = MyPromiseStatus.fulfilled;
      this.#runCb();
    }
  }

  #reject(data) {
    if (this.status === MyPromiseStatus.pending) {
      this.result = data;
      this.status = MyPromiseStatus.rejected;
      this.#runCb();
    }
  }

  #runCb() {
    if (this.status === MyPromiseStatus.fulfilled) {
      this.#resolveCbs.forEach((cb) => {
        cb(this.result);
      });
    }

    if (this.status === MyPromiseStatus.rejected) {
      this.#rejectCbs.forEach((cb) => {
        cb(this.result);
      });
    }
  }

  then(res, _) {
    console.log(this.#resolveCbs);
    this.#resolveCbs.push(res);
    console.log(this.#resolveCbs);

    this.#runCb();
    // rej && this.#rejectCbs.push(rej);
    return new MyPromise((res) => this.value);
  }
}

const dope = new MyPromise((res, rej) => {
  setTimeout(() => res({ a: 56 }), 1000);
})
  .then((res) => {
    res.toString();
    console.log(23423432, res);
  });

console.log(dope.result);
console.log(dope.status);
console.log(dope);
