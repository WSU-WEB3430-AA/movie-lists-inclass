import { ObjectId } from "mongodb"
import clientPromise from "../../../../../lib/mongodb"

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        let list_id = ObjectId(req.query.list)

        let pipeline = [
          {
            $match: { _id: list_id }
          },
          {
            $project: {
              title: 1,
              movies: {
                $map: {
                  input: "$movies",
                  as: "movie",
                  in: {
                    $convert: {
                      input: "$$movie",
                      to: "objectId"
                    }
                  }
                }
              }
            }
          },
          {
            $lookup: {
              from: "movies",
              localField: "movies",
              foreignField: "_id",
              as: "movies"
            }
          }
        ]
        let data = await db.collection('lists').aggregate(pipeline).toArray()
        res.status(200).json({ _id: data[0]._id, title: data[0].title, movies: data[0].movies })
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break;

    case 'POST':
      try {
        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let data = JSON.parse(req.body)
        data.movies = []
        data.votes = 0
        data.createdAt = new Date()
        data.updatedAt = new Date()
        await db.collection('lists').insertOne(data)

        res.status(200).json({ success: true })
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break;
  }

}