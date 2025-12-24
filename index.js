const express = require('express');
const app = express();
const port = 3000;
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Student Management API');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});