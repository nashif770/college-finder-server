const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000


//middleware

app.use(cors());
app.use(express.json());

//middleware

//mongodb


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c1krwnm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    // await client.connect();
    //Pulling Data************************

    const collegeCollection = client.db("collegeFinderDb").collection("allColleges")
    const reviewsCollection = client.db("collegeFinderDb").collection("reviews")
    const mySubmissionCollection = client.db("collegeFinderDb").collection("mySubmission")

    //Colleges
    app.get('/allColleges', async(req, res) => {
        const result = await collegeCollection.find().toArray();
        res.send(result)
    })

    app.get('/threeColleges', async(req, res) => {
        const result = await collegeCollection.find().limit(3).toArray();
        res.send(result)
    })
    

    app.post('/mySubmission', async(req, res) =>{
      const collegeSubmission = req.body;
      console.log(collegeSubmission)
      const result = await mySubmissionCollection.insertOne(collegeSubmission);
      res.send(result);
    }) 

    app.get('/mySubmission', async(req, res) => {
      const result = await mySubmissionCollection.find().toArray();
      res.send(result)
  })

    //Colleges
    // ---------------------------------------------------
    //Reveiws
    app.get('/allReviews', async(req, res) => {
        const result = await reviewsCollection.find().toArray();
        res.send(result)
    })
    


    //Reveiws












    //Pulling Data**************************

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



//mongodb





app.get('/', (req, res)=>[
    res.send('finding college')
])

app.listen(port, ()=>{
    console.log('Students are looking for colleges')
})