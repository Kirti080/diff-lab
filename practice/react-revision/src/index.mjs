
import http from 'http'
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});
server.listen(8000, 'localhost', () => {
  console.log(`Server running at http://localhost:8000/`);
});


import os from 'os';
// const os = require('os');

// Get OS type
const user =os.userInfo();
console.log('User Information:');
console.log(`- Username: ${user.username}`);
console.log(`- User ID: ${user.uid}`);
console.log(`- Group ID: ${user.gid}`);
console.log(`- Home Directory: ${user.homedir}`);
console.log(`OS Type: ${os.type()}`);
console.log(`OS Release: ${os.release()}`);
console.log(`Kernel Version: ${os.version()}`);
const { Console } = require('console');


import http from 'http';

const port =  3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1> This is kirti</h1> <p> Hey this!</p>');
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const { Console } = require('console');
const fs = require('fs');
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) =>{

res. setHeader('Content-Type', 'text/html')
console. log(req.url)

if(req.url == '/')0
res.statusCode = 200;
const data = fs.readFileSync('index.html');
res.end(data.toString());

else if(req.url == '/cwh'){
res.statusCode = 200;
res.end('<h1> This is CodeWithHarry</h1> <p> Hey this is the way to rock the world !< /p>');

else if(req.url == '/about'){
res.statusCode = 200;
res.end('<h1> About CodeWithHarry</h1> <p> Hey this is about CodeWithHarry !< /p>');

else(
res.statusCode = 404;
res.end('<h1> Not Found</h1> <p> Hey this page was not found on this server</p>');)

server. listen(port, (){
console. log('Server is listening on port ${port}');}}}}

import http from 'http';
const port =8000;
const server = http.createServer((req,res)=>{
    res.setHeader('content-type','text/html');
    res.end('<p>hi cutie</p>');
    res.statusCode =200;}
);
server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
}
);


import  express from 'express';
const app =express();
const port =4000;

    app.get('/',(req,res)=>{
    res.send('<h1> this is me </h1> <p> hey this is the way to rock the world</p>');
     })

    app.get('/about', (req,res)=>{
    res.send('<h1> this is about me </h1> <p> hey this is the way to rock the world</p>');
    })

    app.get('/contact', (req,res)=>{
        res.send('<h1> this is contact me </h1> <p> hey this is the way to rock the world</p>');
    })

    app.post('/login', (req,res)=>{
        res.send('<h1> this is login me </h1> <p> hey this is the way to rock the world</p>');
    })

app.listen(port,()=>{
    console.log(`Server is on port ${port}`);
})





import express from 'express';
const app= express();
const port=2000;

let users ={
    name:'kirti',
    age:20,
    id:45
}

app.get('/users',(req,res) =>{
    res.json(users)
})
app.post('/users', (req, res) => {
    // Handle POST request for creating a new user
    const newUser ={
        name: req.body.name,
        age: req.body.age,
        id: req.body.id
    };
    users = newUser;
    res.status(201).json(users);
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})



import express from 'express';
const app = express();

// Middleware for parsing JSON
app.use(express.json());

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET - Retrieve all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET - Retrieve a specific user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST - Create a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update a user completely
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name;
  user.email = req.body.email;

  res.json(user);
});

// DELETE - Remove a user
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

app.listen(8080, () => {
  console.log('REST API server running on port 8080');
});