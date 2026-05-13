// most_comments_03.js - Find the 12 movies with the most comments, sorted by number of comments
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
            _id: 0,
            title: 1,
            year: 1,
            num_mflix_comments: 1
        }
    }
).sort({
    num_mflix_comments: -1
}).limit(12).toArray();
result.forEach(element => {
    console.log(element);
});
await client.close();
exit(0);    
       