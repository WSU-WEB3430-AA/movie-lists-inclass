import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from "swr"
import { fetcher } from "../../../_app"
import Layout from '../../../../components/Layout' 
import PageHeader from '../../../../components/PageHeader' 
import MovieItem from "../../../../components/MovieItem"
import Breadcrumbs from "../../../../components/Breadcrumbs"

export default function Movies() {
  let router = useRouter()
  if (!router.isReady) return <>Loading</>
  const { data, error } = useSWR(`/api/lists/${router.query.list}/movies`, fetcher)
  if (error) return <div>Failed to load data </div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout title={'Movie Lists App'}>
      <Breadcrumbs list={data}></Breadcrumbs>
      <PageHeader
        title="List movies"
        extra={
          <Link href={`/movie-lists/${data._id}/movies/new`}>
            <a className="btn btn-primary">Add new movie</a>
          </Link>
        }>

        <div className="with-border-inbetween">
          {
            data.movies.map((m, i) => (
              <MovieItem list={data} key={i} movie={m} index={i} />
            ))
          }
        </div>
      </PageHeader>
    </Layout >
  )
}
