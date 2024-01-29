const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  const messages = getMessages();
  res.send(`
    <h1>Messages</h1>
    <form action="/send" method="post">
      <label for="message">Message:</label>
      <input type="text" id="message" name="message">
      <button type="submit">Send</button>
    </form>
    <ul>
      ${messages.map(message => `<li>${message}</li>`).join('')}
    </ul>
  `);
});

app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="post">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  if (username) {
    res.cookie('username', username, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.post('/send', (req, res) => {
  const username = req.cookies.username;
  const message = req.body.message;
  if (username && message) {
    addMessage(username, message);
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

function getMessages() {
  try {
    const data = fs.readFileSync('messages.json');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function addMessage(username, message) {
  const messages = getMessages();
  messages.push({ username, message });
  fs.writeFileSync('messages.json', JSON.stringify(messages));
}

app.listen(3000, () => {
  console.log('Server is running on port 4000');
});