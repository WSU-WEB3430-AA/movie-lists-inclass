import ListForm from "../../components/ListForm";
import PageHeader from "../../components/PageHeader";
import Layout from "../../components/Layout";

export default function NewList(){
  return (
    <Layout title={"Movie Lists App"}>
      <PageHeader title={"Adding a new list"}>
        <ListForm />
      </PageHeader>
    </Layout>
  )
}