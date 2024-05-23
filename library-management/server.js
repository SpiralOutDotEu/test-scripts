const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Library management system listening at http://localhost:${port}`);
});
