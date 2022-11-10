import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"

export default function DeleteModal({list, movie, order}){
  let router = useRouter()
  let { mutate } = useSWRConfig()
  const deleteListOrMovie = () => {
    fetch(`/api/lists/${list._id}${movie ? "/movies/" + movie._id : ""}`, {
      method: "DELETE"
    })
      .then(() => {
        document.querySelector(".modal-backdrop").remove()
        document.querySelector(`#deleteMovieModal_${order}`).remove()
        toast.success(`Successfully deleted`)
        mutate("/api/lists")
        // document.location = movie ? `/movie-lists/${list._id}/movies` : "/movie-lists"
        router.push(movie ? `/movie-lists/${list._id}/movies` : "/movie-lists")
      })
      .catch((err) => {
        toast.error(`Failed to submit your message: ${err.message}`)
      })
  }
  return (
    <div className="modal fade" id={`deleteMovieModal_${order}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure about this?</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete <strong>{movie ? movie.title : list.title}</strong>?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-danger" onClick={deleteListOrMovie}>
              Confirm delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}