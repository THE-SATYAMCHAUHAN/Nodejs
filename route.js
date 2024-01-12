const fs = require('fs');

const requestHandler = (req, res)=>{
    const url=req.url;
    if (url === '/') {
        // Read the content of 'messages.txt' and display it on the home page
        fs.readFile('messages.txt', 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading messages:', err);
            res.statusCode = 500; // Internal Server Error
            return res.end();
          }
    
          // Display the messages in the HTML form
          res.setHeader('Content-Type', 'text/html');
          res.write('<html>');
          res.write('<head><title>Enter Message</title></head>');
          res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>'
          );
          
          // Display messages if available
          if (data) {
            res.write( data );
          }
    
          res.write('</body></html>');
          res.end();
        });
      } else if (url === '/message' && req.method === 'POST') {
        // Handle the POST request to save a message
        let data = '';
        req.on('data', chunk => {
          data += chunk;
        });
    
        // When the entire request body has been received
        req.on('end', () => {
          // Save the message to 'messages.txt'
          fs.appendFile('messages.txt', data + '\n', 'utf8', err => {
            if (err) {
              console.error('Error saving message:', err);
              res.statusCode = 500; // Internal Server Error
              return res.end();
            }
    
            // Respond with a redirect to the root URL
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
          });
        });
      } else {
        // Default response for other URLs
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js server!</h1></body>');
        res.write('</html>');
        res.end();
      }
}

module.exports= requestHandler;