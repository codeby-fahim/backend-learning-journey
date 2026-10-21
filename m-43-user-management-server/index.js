import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const users = [
  {id: 1, name:"Fahim", email: "fahim@d.com"},
  {id: 2, name:"Fahim2", email: "fahim2@d.com"},
  {id: 3, name:"Fahim3", email: "fahim3@d.com"},
  {id: 4, name:"Fahim4", email: "fahim4@d.com"}
]

app.get('/', (req, res)=>{
  res.send("Users are coming soon")
})
app.get('/users', (req, res)=>{
  res.send(users)
})

app.post('/users', (req, res)=>{
  console.log('data from client', req.body);
  // Temporary Storage
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send({success: true, message: "user added successfully"})
})

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})
