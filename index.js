const express = require('express');
const app = express();
const db= require('./utils/db');
const port = 3000;
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Student Management API');
});

db.sync().then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
}).catch((err) => {
    console.error('Error synchronizing database:', err);
});