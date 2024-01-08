

const http = require('http');

const server = http.createServer((req, res) => {
  
  console.log('My name is ChatGPT.');
});

const PORT = 4000;

server.listen(PORT);
