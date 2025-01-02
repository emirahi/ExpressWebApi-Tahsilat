const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
