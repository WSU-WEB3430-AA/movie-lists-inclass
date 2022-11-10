import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': // /api/lists
      try {
        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let data = await db.collection('lists').find({}).toArray()

        res.status(200).json(data)
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break;

    case 'POST': // /api/lists
      try {
        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let data = JSON.parse(req.body)
        data.movies = []
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