import express, { Router } from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb';
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
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const database = client.db('sample_mflix');
        const collection = database.collection('users');
        const queryResult = await collection.find({}).toArray();
        console.log(queryResult);
        res.status(200).send(queryResult);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
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