import { ObjectId } from "mongodb"
import clientPromise from "../../../../lib/mongodb"

export default async function handler(req, res){
  switch(req.method){
    case 'GET': // /api/lists/[list]
      try{
        const client = await clientPromise
    
        const db = client.db(process.env.DB_NAME)
        let list_id = ObjectId(req.query.list)
        let data = await db.collection('lists').findOne(
          {_id: list_id}
         )
    
        res.status(200).json(data)
      } catch (e) {
        res.status(400).json({success: false})
      }
      break;

    case 'PUT': // /api/lists/[list]
    case 'PATCH':
      try{
        const client = await clientPromise
    
        const db = client.db(process.env.DB_NAME)
        let data = JSON.parse(req.body)
        data.updatedAt = new Date()
        delete data['_id']
        let list_id = ObjectId(req.query.list)
        await db.collection('lists').updateOne(
          {_id: list_id},
          {
            $set: data
          }
        )
        
        res.status(200).json({success: true})
      } catch (e) {
        res.status(400).json({success: false})
      }
      break
      case 'DELETE': // /api/lists/[list]
        try{
          const client = await clientPromise
      
          const db = client.db(process.env.DB_NAME)
          let list_id = ObjectId(req.query.list)
          await db.collection('lists').deleteOne({_id: list_id} )
          
          res.status(200).json({success: true})
        } catch (e) {
          res.status(400).json({success: false})
        }
        break;
  }

}