import { ObjectId } from "mongodb"
import clientPromise from "../../../../../lib/mongodb"

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        let list_id = ObjectId(req.query.list)
        let list = await db.collection('lists').findOne({ _id: list_id })
        
        let movies = await db.collection('movies').find({
          _id: {
            "$not": {
              "$in": list.movies.map(id => ObjectId(id))
            }
          }
        }).toArray()

        res.status(200).json({ list, movies })
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let list_id = ObjectId(req.query.list)
        let list = await db.collection('lists').findOne({ _id: list_id })

        let addables = JSON.parse(req.body)
        addables = addables.movies.map(id => ObjectId(id))
        let data = {
          movies: [...list.movies, ...addables],
          updatedAt: new Date()

        }
        await db.collection('lists').updateOne(
          { _id: list_id },
          {
            $set: data
          }
        )

        res.status(200).json({ success: true })
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break
  }

}