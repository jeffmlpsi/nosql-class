// rating_02.js - Find the top 10 movies by viewer rating
import { MongoClient } from 'mongodb';
import { exit } from 'node:process';

// Replace with your actual connection string (e.g., from MongoDB Atlas)
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const db = await client.db('sample_mflix');
const collection = db.collection('movies');
const result = await collection.find(
  {},
  { projection:
    {
        title: 1,
        "tomatoes.viewer.rating": 1
    }
  }
).sort({
  "tomatoes.viewer.rating": -1
}).limit(10).toArray();
result.forEach(element => {
    console.log(element);
});
await client.close();
exit(0);    