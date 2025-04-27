const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', group: 'target audience' },
  { id: 2, name: 'Bob', email: 'bob@example.com', group: 'regular customers' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', group: 'others' },
];

const availableGroups = ['target audience', 'regular customers', 'others'];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/groups', (req, res) => {
  res.json(availableGroups);
});

app.post('/users', (req, res) => {
  const { name, email, group } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
    group: group || 'others',
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { group } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  if (!availableGroups.includes(group)) {
    return res.status(400).send('Invalid group');
  }
  user.group = group;
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
