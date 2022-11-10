import { format } from "date-fns";
import Link from "next/link";
import DeleteModal from "./DeleteModal";

export default function ListItem({ order, list }) {

  return (
    <div className="d-flex my-3">
      <div className="flex-shrink-0 text-center">
        <h1 className="display-5 text-primary">{list.movies?.length}</h1>
        <p className="lead">movies</p>
      </div>
      <div className="flex-grow-1 ms-5">
        <h3 className="card-title">{list.title}</h3>
        <p className="card-text">{list.description}</p>
        <p>
          <strong>Created at</strong>: {format(list.createdAt, "MM/dd/yyyy")}
        </p>
        <DeleteModal order={order} list={list}></DeleteModal>
        <div>
          <Link href={`/movie-lists/${list._id}/edit`}>
            <a className="btn btn-secondary">Edit list</a>
          </Link>
          <a className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#deleteMovieModal_${order}`}>
            Delete
          </a>
          <Link href={` /movie-lists/${list._id}/movies`}>
            <a className="btn btn-primary">See movies</a>
          </Link>
        </div>
      </div>
    </div>
  )
}