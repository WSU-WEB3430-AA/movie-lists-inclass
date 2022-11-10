import { ObjectId } from "mongodb"
import clientPromise from "../../../../../../lib/mongodb"

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let list_id = ObjectId(req.query.list)
        let movie_id = ObjectId(req.query.movie)

        let list = await db.collection('lists').findOne({ _id: list_id })
        let movie = await db.collection('movies').findOne({ _id: movie_id })
        res.status(200).json({ _id: list._id, title: list.title, movie: movie })
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break;

    case 'PUT':
    case 'PATCH':
      try {
        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let data = JSON.parse(req.body)
        data.updatedAt = new Date()
        delete data['_id']
        let movie_id = ObjectId(req.query.movie)
        await db.collection('movies').updateOne(
          { _id: movie_id },
          {
            $set: data
          }
        )

        res.status(200).json({ success: true })
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let movie_id = ObjectId(req.query.movie)
        await db.collection('movies').deleteOne({ _id: movie_id })

        res.status(200).json({ success: true })
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break;
  }

}