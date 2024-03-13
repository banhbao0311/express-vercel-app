import express, { Router } from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb';
import fetch  from 'node-fetch'
const app = express();
const uri = "mongodb+srv://nhannguyenthanh0311:iOc5AwGQeMAdecDo@cluster0.vmw5wth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function fetchData() {
    const url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gmqxt/endpoint/data/v1/action/find';
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'ynhygYUdAQc6EVBwK9AOuYGU5i3iWYBE5PddLJcNWDCYlW6i5tjGhik9iHjuIHpB',
      'Accept': 'application/'
    };
    const body = JSON.stringify({
        dataSource: 'Cluster0',
        database: 'sample_mflix',
        collection: 'users',
        filter: {}
      });
  
    try {
        const response = await fetch(url, { method: 'POST', headers, body });
        const data = await response.json();
        console.log(data);
  
    } catch (error) {
      console.log('Lỗi khi gửi yêu cầu:', error);
    }
  }



app.get('/', (req, res, next) => {
    var json = [
        {
            name: "Nguyen Thanh Nhan",
            yob: "2002",
        },
        {
            name: "Nguyen The Huy",
            yob: "xxxx",
        },
        {
            name: "Nguyen Thi Ngoc Mai",
            yob: "xxxx",
        }
    ]
    run().catch(console.dir);

    res.json(json);
})

app.get('/user', async (req, res, next) => {
    const url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gmqxt/endpoint/data/v1/action/find';
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'ynhygYUdAQc6EVBwK9AOuYGU5i3iWYBE5PddLJcNWDCYlW6i5tjGhik9iHjuIHpB',
      'Accept': 'application/'
    };
    const body = JSON.stringify({
        dataSource: 'Cluster0',
        database: 'sample_mflix',
        collection: 'users',
        filter: {}
      });
  
    try {
        const response = await fetch(url, { method: 'POST', headers, body });
        const data = await response.json();
        console.log(data);
        res.json(data);
  
    } catch (error) {
      console.log('Lỗi khi gửi yêu cầu:', error);
    }



})

app.get('/comments', async (req,res,next)=>{    
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const database = client.db('sample_mflix');
        const collection = database.collection('comments');
        const queryResult = await collection.find({name: 'Mercedes Tyler'}).toArray();
        console.log(queryResult);
        res.status(200).send(queryResult);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

app.get('/products', async (req,res,next)=>{    
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const database = client.db('sample_mflix');
        const collection = database.collection('products');
        const queryResult = await collection.find({}).toArray();
        console.log(queryResult);
        res.status(200).send(queryResult);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

app.listen(3000, () => {
    console.log('app is running');
})