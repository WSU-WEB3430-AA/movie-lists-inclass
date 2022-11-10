import { useRouter } from "next/router"
import useSWR from "swr"
import MovieForm from "../../../../../components/MovieForm"
import PageHeader from "../../../../../components/PageHeader"
import Layout from "../../../../../components/Layout"
import { fetcher } from "../../../../_app"

export default function EditList(){
  let { list: lid, movie: mid } = useRouter().query
  const { data, error } = useSWR(`/api/lists/${lid}/movies/${mid}`, fetcher)

  return (
    <Layout title={"Movie Lists App"}>
      <PageHeader title={"Editing a movie"}>
        <MovieForm list={data} movie={data.movie}/>
      </PageHeader>
    </Layout>
  )
}