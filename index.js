const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?user=1
// Route params = users/1
// Request body = { "name": "Lucas", "email": "lucas@gmail.com"}

// CRUD - Create, Read, Update, Delete

const users = ['Lucas', 'Karen', 'Cristal'];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

function checkUsersExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}

function checkUsers(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: 'User does not exists'})
  }

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUsers, (req, res) => {
  // const id = req.params.id; sem desestruturação e abaixo com 

  const { index } = req.params;

  return res.json(users[index]);
});

server.post('/users', checkUsersExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUsersExists, checkUsers, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', checkUsers, (req, res) => {
  const { index } = req.params;
  
  users.splice(index, 1);

  return res.send('Usuário deletado');
});
//testando git novamente

server.listen(3000);