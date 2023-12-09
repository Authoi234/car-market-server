const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

// user name: dbUser3
// Password : b6KLDOGlQURA0DV9

const uri = "mongodb+srv://dbUser3:b6KLDOGlQURA0DV9@cluster0.6iupoas.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, } });

async function run() {
    try {
        const carCollection = client.db('nodeMongoCrud').collection('cars')

        app.get('/cars', async (req, res) => {
            const query = {};
            const cursor = carCollection.find(query);
            const cars = await cursor.toArray();
            res.send(cars);
        })

        app.post("/cars", async (req, res) => {
            console.log('Post Api Called');
            const car = req.body;
            const result = await carCollection.insertOne(car);
            car._id = result.insertedId;
            console.log(result);
            console.log(car);
        })
        
        app.delete('/cars/:id', async(req, res) => {
            const id = req.params.id;
            // console.log('trying to delete', id);
            const query = { _id: new ObjectId(id) }
            const result = await carCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        });

    }
    finally {

    }
}

run().catch(err => console.error(err))


app.get('/', (req, res) => {
    res.send('Welcome To Car Market Server')
})

app.listen(port, () => {
    console.log('Listening from port', port);
})