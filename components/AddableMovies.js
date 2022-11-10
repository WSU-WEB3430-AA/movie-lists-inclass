import { useRouter } from "next/router"
import { toast } from "react-toastify"
import useSWR from "swr"
import { fetcher } from "../pages/_app"
import PageHeader from "./PageHeader"

export default function AddableMovies({ list : lid }) {
  let router = useRouter()
  const { data: addables, error } = useSWR(`/api/lists/${lid}/movies/addable`, fetcher)
  if (error) return <div>Failed to load data </div>
  if (!addables) return <div>Loading...</div>

  let selectedMovies = []
  const addMovies = (e) => {
    e.preventDefault()
    fetch(`/api/lists/${lid}/movies/addable`, {
      method: "PUT",
      body: JSON.stringify({ movies: selectedMovies }),
    })
      .then(() => {
        toast.success(`Successfully submitted`)
        router.push(`/movie-lists/${lid}/movies`)
      })
      .catch((err) => {
        toast.error(`Failed to submit your message: ${err.message}`)
      })
  }

  const selectMovie = (e) => {
    if (e.target.checked) {
      selectedMovies.push(e.target.value)
    } else {
      selectedMovies.splice(selectedMovies.indexOf(e.target.value), 1)
    }
  }

  if (!addables) return <p>Loading...</p>

  return (
    <PageHeader title={"Or add existing movies"}>
      <form id="addable-movies">
        <div className="mx-5 mb-3 row">

          <table className="table align-middle">
            <tbody>
              {addables.movies.map((movie, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <img src={movie.poster} alt={movie.title} className="img-fluid" width="40" />
                    </td>
                    <td>{movie.title}</td>
                    <td>
                      <input
                        type="checkbox"
                        name="movie"
                        value={movie._id}
                        className="form-check-input"
                        onChange={selectMovie}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={addMovies}>
            Add selected movies
          </button>
        </div>
      </form>
    </PageHeader>
  )
}