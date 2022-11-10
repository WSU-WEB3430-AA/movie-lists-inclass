import React from "react"
import { format } from "date-fns"
import { useRouter } from "next/router"
import Link from "next/link"
import useSWR from "swr"
import { fetcher } from "../../../../_app"
import Breadcrumbs from "../../../../../components/Breadcrumbs"
import PageHeader from "../../../../../components/PageHeader"
import Layout from "../../../../../components/Layout"
import DeleteModal from "../../../../../components/DeleteModal"
import StarRating from "../../../../../components/StarRating"

export default function Movie() {
  let { list: lid, movie: mid } = useRouter().query
  const { data, error } = useSWR(`/api/lists/${lid}/movies/${mid}`, fetcher)
  if (error) return <div>Failed to load data </div>
  if (!data) return <div>Loading...</div>

  let movie = data.movie
  return (
    <Layout title="Movie Lists App">
      <Breadcrumbs list={data} movie={movie}></Breadcrumbs>
      <PageHeader title={movie.title} extra={
          <div className="d-flex">
            <div className="flex-grow-1">
              <Link href={`/movie-lists/${data._id}/movies/${movie._id}/edit`}>
                <a className="btn btn-secondary">Edit</a>
              </Link>
            </div>
            <div>
              <DeleteModal index={movie.id} list={data} movie={movie} page={movie.title}></DeleteModal>
              <a data-bs-toggle="modal" data-bs-target={`#deleteMovieModal_${movie.id}`} className="btn btn-danger">
                Delete
              </a>
            </div>
          </div>
      }
      >

        <div className="clearfix mt-4">
          <img src={movie.poster} className="ms-2 w-25 float-end" alt={movie.title} />
          {/* <h2 className="card-title">{ movie.title}</h2> */}
          <p className="card-text">{movie.plot}</p>
          <p>
            <strong>Rating</strong>: <StarRating rating={movie.rating} /> {movie.rating}
          </p>
          <p>
            <strong>Votes</strong>: {movie.votes}
          </p>
          <p>
            <strong>Rated</strong>: {movie.rated}
          </p>
          <p>
            <strong>Genre</strong>: {movie.genre}
          </p>
          <p>
            {/* <strong>Release date</strong>: {format(movie.releaseDate, "MM/dd/yyyy")} */}
          </p>
        </div>

        {/* <div>
          <MovieReviews list={currentList} movie={movie} />
        </div> */}
      </PageHeader>
    </Layout>
  )
}