import Layout from "../../components/Layout";
import ListItem from "../../components/ListItem";
import PageHeader from "../../components/PageHeader";
import Breadcrumbs from "../../components/Breadcrumbs"
import Link from "next/link";
import { getSession } from 'next-auth/react'
import clientPromise from "../../lib/mongodb";

export async function getServerSideProps(context){
  const session = await getSession(context)

  const client = await clientPromise

  const db = client.db(process.env.DB_NAME)
  let data = await db.collection('lists').find({
    $or : [
      {owner: session?.user.email},
      {public: true}
    ]
  }).toArray()

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}


export default function MovieLists({data}) {
  data = JSON.parse(data, (key, value) => {
    const dataFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/ 
    if (typeof value === "string" && dataFormat.test(value)){
      return new Date(value)
    }

    return value
  })
  
  return (
    <Layout title={'Movie Lists App'}>
      <Breadcrumbs list={data} />
      <PageHeader
        title="Available movie lists"
        extra={
          <Link href="/movie-lists/new">
            <a className="btn btn-primary">Add new list</a>
          </Link>
        }>
        <div>
          {
            data.map((list, i) => (
              <ListItem key={i} list={list} order={i + 1}></ListItem>
            ))
          }
        </div>
      </PageHeader>
    </Layout>
  )
}