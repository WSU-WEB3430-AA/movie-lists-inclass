import { format } from "date-fns"
import Link from "next/link"


export default function MovieItem({ list, movie }) {

  return (
    <div className="d-flex">
      <div className="flex-shrink-0" style={{ width: "15%" }}>
        <img src={movie.poster} className="img-fluid img-thumbnail" alt={movie.title} />
      </div>
      <div className="flex-grow-1 ms-3">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-text">{movie.plot}</p>
        <p>
          <strong>Release date</strong>: {format(movie.releaseDate, "MM/dd/yyyy")}
        </p>
        <p>
          <Link href={`/movie-lists/${list._id}/movies/${movie._id}`}>
            <a className="btn btn-primary m-2">See movie details</a>
          </Link>
        </p>
      </div>
    </div>
  )
}