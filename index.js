const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// use middleware
app.use(cors());
app.use(express.json());

// connect to server
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bu6kaai.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("volunteer");
        const userCollection = database.collection("services");

        // GET API
        app.get('/services', async (req, res) => {
            const query = userCollection.find({});
            const services = await query.toArray();
            res.send(services);
        });

        // GET API
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const user = { _id: ObjectId(id) };
            const result = await userCollection.findOne(user);
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }

} run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from bangladesh');
});
app.listen(port, () => {
    console.log('Listening the port', port);
});
