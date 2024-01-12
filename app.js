

const http = require('http');

const server = http.createServer((req, res) => {
  // Log the request details
  console.log(req.url, req.method, req.headers);

  // Set the response header
  res.setHeader('Content-Type', 'text/html');

  // Check the URL and send custom responses
  if (req.url === '/home') {
    res.write('<html><body><h1>Welcome home</h1></body></html>');
  } else if (req.url === '/about') {
    res.write('<html><body><h1>Welcome to About Us page</h1></body></html>');
  } else if (req.url === '/node') {
    res.write('<html><body><h1>Welcome to my Node Js project</h1></body></html>');
  } else {
    // Default response for other URLs
    res.write('<html><body><h1>Hello from my Node.js server!</h1></body></html>');
  }

  // End the response
  res.end();
});

// Listen on port 4000
server.listen(4000);

