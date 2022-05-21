import crypto from 'crypto';
import OS from 'os';

console.log(OS.cpus().length);

process.env.UV_THREADPOOL_SIZE = 8;
const start = process.hrtime();
console.log(process.env);

for (let i = 0; i < 9; i += 1) {
  crypto.pbkdf2('secret', 'salt', 10000, 512, 'sha512', (err) => {
    if (err) throw err;
    const end = process.hrtime(start);
    console.log('process %d start: %d,  end: %d', i, end[0], end[1]);
  });
}
