// npm install mongodb
import { MongoClient } from 'mongodb';
import { exit } from 'node:process';

const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db("sample_mflix");
  const comments = db.collection("comments");
  const results = await comments.aggregate([
    {
      $sort: {
        movie_id: 1,
        date: 1
      }
    },
    {
      $group: {
        _id: "$movie_id",
        first_3_comments: {
          $push: {
            name: "$name",
            email: "$email",
            text: "$text",
            date: "$date"
          }
        }
      }
    },
    {
      $project: {
        first_3_comments: {
          $slice: ["$first_3_comments", 3]
        }
      }
    },
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "_id",
        as: "movie"
      }
    },
    {
      $unwind: "$movie"
    },
    {
      $project: {
        _id: 0,
        title: "$movie.title",
        first_3_comments: 1
      }
    },
    {
      $sort: {
        title: 1
      }
    },
    {
      $limit: 3
    }
  ]).toArray();
  //console.log(JSON.stringify(results, null, 2));
  // console.log(results, null, 2);
  results.forEach(element => {
    console.log('Movie Title:' + element.title);
    element.first_3_comments.forEach(comment => {
      console.log(`  ${comment.name} (${comment.email}) on ${comment.date}: ${comment.text}`);
    });
    console.log();
  });
} catch (err) {
  console.error("Error:", err);
} finally {
  await client.close();
}

exit(0);