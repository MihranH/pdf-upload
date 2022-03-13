const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(require('./router'));


app.listen(PORT, () => {
  console.log(`Auth service listening to port ${PORT}`);
});