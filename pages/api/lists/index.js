import clientPromise from "../../../lib/mongodb"
import { authOptions } from "../auth/[...nextauth]"
import { unstable_getServerSession} from "next-auth"

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': // /api/lists
      try {
        const session = await unstable_getServerSession(req, res, authOptions)

        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let data = await db.collection('lists').find({
          $or : [
            {owner: session?.user.email},
            {public: true}
          ]
        }).toArray()

        res.status(200).json(data)
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break;

    case 'POST': // /api/lists
      try {
        const session = await unstable_getServerSession(req, res, authOptions)
        if(!session){
          throw new Error("Unauthenticated request")
        }

        const client = await clientPromise

        const db = client.db(process.env.DB_NAME)
        let data = JSON.parse(req.body)
        data.movies = []
        data.owner = session.user.email
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