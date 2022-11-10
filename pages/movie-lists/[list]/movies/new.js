import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import MovieForm from "../../../../components/MovieForm";
import PageHeader from "../../../../components/PageHeader";

export default function NewMovie(){
  let router = useRouter()
  if (!router.isReady) return <>Loading</>
  let list = router.query.list

  return (
    <Layout title={"Movie Lists App"}>
      <PageHeader title={"Adding a new movie"}>
        <MovieForm list={list}/>
      </PageHeader>
    </Layout>
  )
}