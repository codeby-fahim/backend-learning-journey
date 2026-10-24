import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import 'dotenv/config' 

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

const client = new MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-mcp58gw-shard-00-00.pgut4sk.mongodb.net:27017,ac-mcp58gw-shard-00-01.pgut4sk.mongodb.net:27017,ac-mcp58gw-shard-00-02.pgut4sk.mongodb.net:27017/?ssl=true&replicaSet=atlas-3rrgmq-shard-0&authSource=admin`);



export async function connectToMongodb(){
  try{
    await client.connect();
    console.log('Successfully connected to MongoDB');
    return client;
  } catch(err){
    console.dir(err)
  }
}
const connect = await connectToMongodb();
const db = connect.db('simpleCrudDB');
const users = db.collection('users');

app.get('/', (req, res)=>{
  res.send('Simple Crud Server is running')
})

app.get('/users', async(req, res)=>{
  const cursor = users.find({});
  const allUsers = await cursor.toArray();
  res.send(allUsers)
})
app.get('/users/:id', async(req, res)=>{
  console.log('params in the server', req.params);
  const id = req.params.id;
  const query = { _id: new ObjectId(id)}
  const result = await users.findOne(query);
  res.send(result);
})
app.post('/users', async(req, res)=>{
  const newUser = req.body;
  const result = await users.insertOne(newUser);
  res.send(result);

  console.log('Adding new user', newUser);
})
app.delete('/users/:id', async(req, res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await users.deleteOne(query);
  res.send(result)
})


app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})