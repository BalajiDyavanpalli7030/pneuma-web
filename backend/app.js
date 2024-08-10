const express = require('express');
const app = express();
const port = 5000;
const creditCardRoutes = require('./src/routes/creditCardRoutes');

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api', creditCardRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
