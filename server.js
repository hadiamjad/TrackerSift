const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const {MongoClient} = require('mongodb');
const uri="mongodb+srv://hadiyoville25:Hadiharis1@cluster0.26mt4.mongodb.net/NetworkCallStack?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(async function () {
  await client.connect();
})();

async function insertRequest(client, newHttpReq){ 
  const result = await client.db("NetworkCallStack").collection("logs").insertOne(newHttpReq);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

app.post('/', (req, res) => {
  console.log(req.body);
  insertRequest(client, req.body);
  res.send("success");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})