import http from 'http';

const server = http.createServer()

server.on('request', (req, res) => {
  if(req.method === 'POST') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk.toString()
    });

    req.on('end', () => {
      res.write(data);
      res.end();
    })

}})

server.on('request', async (req, res) => {
  if(req.method === 'GET') {
    const start = Date.now()

    while (Date.now() < start + 10000) {}

    res.write(req.url)
    res.end();
}})

server.listen(3013)

console.log('up and runnin');