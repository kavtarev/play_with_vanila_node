import http from 'http';

const server = http.createServer(async (req, res) => {
  // async work requests don't block each other

  if (req.url === '/async') {
    const start = Date.now();
    console.log(start);

    setTimeout(() => {
      res.write('async work');
      res.end(req.url);
    }, 10000);

    console.log(`it took ${start - Date.now()} seconds`);
  }

  if (req.url === '/promise') {
  // fake async with promise doesn't work

    async function makePromise() {
      return new Promise((resolve) => {
        const start = Date.now();

        while (Date.now() - start < 5000) {}

        resolve('done');
      });
    }
    console.log('start');

    makePromise().then((result) => {
      res.write(result);
      res.end('!');
    });

    console.log('end');
  }

  if (req.url === '/fake-async') {
    // async doesnt work requests block each other (async at createServer)

    const start = Date.now();

    while (Date.now() - start < 5000) {}

    res.write('fake async doesnt work');
    res.end('!');
  }

  if (req.url === '/fake-async-with-await') {
    // async doesnt work requests block each other

    const start = Date.now();
    console.log(start);

    async function FakeAsync() {
      const start = Date.now();

      while (Date.now() - start < 10000) {}

      res.write('fake async with await doesnt work either');
      res.end('!');
    }

    await FakeAsync();

    console.log(`it took ${start - Date.now()} seconds`);
  }
});

server.listen(3013);

console.log('up');
