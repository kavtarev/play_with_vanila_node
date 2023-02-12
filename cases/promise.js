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
      this.#reject(e).bind(this);
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

  then(res, rej) {
    return new MyPromise((resolve, reject) => {
      if (this.status === MyPromiseStatus.pending) {
        if (res) {
          this.#resolveCbs.push(() => {
            try {
              resolve(res(this.result));
            } catch (e) {
              reject(e);
            }
          });
        }
        if (rej) {
          this.#rejectCbs.push(() => {
            try {
              reject(rej(this.result));
            } catch (e) {
              reject(e);
            }
          });
        }
      }
      if (this.status === MyPromiseStatus.fulfilled) {
        try {
          resolve(res(this.result));
        } catch (e) {
          reject(e);
        }
        // this.#resolveCbs.push(res);
      } if (rej && this.status === MyPromiseStatus.fulfilled) {
        try {
          reject(rej(this.result));
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  catch(rej) {
    this.then(null, rej);
  }
}

// const dope = new MyPromise((res, rej) => {
//   setTimeout(() => res({ a: 56 }), 1000);
// })
//   .then((res) => {
//     res.n = 10_00;
//     console.log(23423432, res);
//   });

const doom = new MyPromise((res) => setTimeout(() => res('hi'), 500));
const doom2 = new MyPromise((res) => res('hi'));
doom2.then((res) => `${res} 1`)
  .then((res) => `${res} 2`)
  .then((res) => console.log(res));

// console.log(dope.result);
// console.log(dope.status);
// console.log(dope);
