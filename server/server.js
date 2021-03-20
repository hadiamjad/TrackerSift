const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const {MongoClient} = require('mongodb');
const uri="mongodb://mongo:27017/NetworkCallStack";
const client = new MongoClient(uri);

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(async function () {
  await client.connect();
  console.log("connected to Database");
})();

async function insertRequest(client, newHttpReq){ 
  const result = await client.db("NetworkCallStack").collection("request").insertOne(newHttpReq);
  console.log(`New request created with the following id: ${result.insertedId}`);
}

async function insertResponse(client, newHttpResp){ 
  const result = await client.db("NetworkCallStack").collection("response").insertOne(newHttpResp);
  console.log(`New response created with the following id: ${result.insertedId}`);
}

app.post('/request', (req, res) => {
  //console.log(req.body);
  insertRequest(client, req.body);
  res.send("request-success");
})

app.post('/response', (req, res) => {
  //console.log("response");
  insertResponse(client, req.body);
  res.send("response-success");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
