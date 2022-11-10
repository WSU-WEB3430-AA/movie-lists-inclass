import { FaThumbsUp, FaTrashAlt } from 'react-icons/fa'

export default function Quote({ ndx, q }) {
  const likeQuote = () => {
    fetch(`/api/quotes/${q._id}/like`, {
      method: "PUT",
      body: {
        votes: q.votes
      },
    }).then((data) => {
      document.location = "/quotes"
    }).catch((error) => {
      toast('Failed to submit', {
        onClose: () => {
          document.location = "/quotes"
        }
      })
    })
  }

  const deleteQuote = () => {
    if (confirm("Are you sure you want to delete this quote")) {
      fetch(`/api/quotes/${q._id}`, {
        method: "DELETE",
      }).then(() => {
        document.location = "/quotes"
      }).catch((error) => {
        toast('Failed to delete', {
          onClose: () => {
            document.location = "/quotes"
          }
        })
      })
    }
  }

  return (
    <div className="card col my-4 py-5 shadow">
      <div className="card-body text-center">
        <div className="row">
          <div className="col-1">
            <div style={{ width: "60px", height: "60px", lineHeight: "60px" }} className="bg-primary text-light text-center rounded-circle">
              {ndx + 1}
            </div>
          </div>
          <div className="col-10">
            <figure>
              <blockquote className="blockquote">
                <p className="lead">{q.quote}</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                {q.by}
              </figcaption>
            </figure>
          </div>
          <div className="col-1 text-center">
            <div>
              <span className="lead fs-6 text-primary">{q.votes}</span>
              <br />
              Votes
              <hr />
              <FaThumbsUp size="30%" className="text-primary" onClick={likeQuote} title="Like" />
              <hr />
              <FaTrashAlt size="30%" className="text-danger" onClick={deleteQuote} title="Delete" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}