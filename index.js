const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// dbuser1:5B2PYCYai5q6XLjM
const dbUser = process.env.REACT_APP_dbUser;
const dbPassword = process.env.REACT_APP_dbPassword;

const uri = `mongodb+srv://dbuser1:5B2PYCYai5q6XLjM@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try {
        const productsCollection = client.db('daisyShopDB').collection('products');

        // GET method
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        // POST method
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        // DELETE method
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })

        // GET method [for getting single data]
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            res.send(product);
        })

    } finally { }
}
run().catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send('Daisy Shop server is running');
});

app.listen(port, () => {
    console.log("Server is running on port:", port);
});
