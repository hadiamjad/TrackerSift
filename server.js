const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})