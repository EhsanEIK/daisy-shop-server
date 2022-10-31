const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// dbuser1:5B2PYCYai5q6XLjM
const dbUser = process.env.REACT_APP_dbUser;
const dbPassword = process.env.REACT_APP_dbPassword;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('db connected')
    client.close();
});

app.get('/', (req, res) => {
    res.send('Daisy Shop server is running');
});

app.listen(port, () => {
    console.log("Server is running on port:", port);
});
