import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
  res.send("Hello World form express.js")
})

app.get('/about', (req, res)=>{
  res.send("About Page")
})
app.get('/dashboard', (req, res)=>{
  res.send("Dashboard or Page")
})
app.get('/contact', (req, res)=>{
  res.send("This is contact Page");
})

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})