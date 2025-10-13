// 1. 몽고DB 공식 문서 예제

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://orangenova91_db_user:6VV3rHFMoKQg6jT0@cluster0.dx79l5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


//MONGODB_URI="mongodb+srv://orangenova91_db_user:6VV3rHFMoKQg6jT0@cluster0.dx79l5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



// 2. 애플 코딩 추천

// import { MongoClient } from 'mongodb'
// const url = process.env.MONGODB_URI
// const options = { useNewUrlParser: true }
// let MongoDB

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongo) {
//     global._mongo = new MongoClient(url,options).connect()
//   }
//   MongoDB = global._mongo
// } else {
//   MongoDB = new MongoClient(url,options).connect()
// }
// export function MongoDB(){

// }



