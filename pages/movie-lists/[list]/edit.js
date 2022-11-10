import { useRouter } from "next/router";
import useSWR from "swr";
import ListForm from "../../../components/ListForm";
import PageHeader from "../../../components/PageHeader";
import Layout from "../../../components/Layout";
import { fetcher } from "../../_app";

export default function EditList(){
  let router = useRouter()
  const { data, error } = useSWR(`/api/lists/${router.query.list}`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <Layout title={"Movie Lists App"}>
      <PageHeader title={"Editing a list"}>
        <ListForm list={data}/>
      </PageHeader>
    </Layout>
  )
}