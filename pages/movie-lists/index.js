import useSWR from "swr";
import Layout from "../../components/Layout";
import ListItem from "../../components/ListItem";
import PageHeader from "../../components/PageHeader";
import Breadcrumbs from "../../components/Breadcrumbs"
import { fetcher } from "../_app";
import Link from "next/link";

export default function MovieLists() {
  const { data, error } = useSWR('/api/lists', fetcher)
  if (error) return <div>Failed to load data</div>
  if (!data) return <div>Loading...</div>

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