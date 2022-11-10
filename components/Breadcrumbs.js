import Link from "next/link"

export default function Breadcrumbs({ list, movie, page }) {
  let items = [
    <li key={0} className="breadcrumb-item">
      <Link href={`/movie-lists`}>All</Link>
    </li>,
  ]

  if (movie) {
    items.push(
      <li key={items.length} className="breadcrumb-item">
        <Link href={`/movie-lists/${list._id}/movies`}>{list.title}</Link>
      </li>
    )
    if (page) {
      items.push(
        <li key={items.length} className="breadcrumb-item">
          <Link href={`/movie-lists/${list._id}/movies/${movie._id}`}>{movie.title}</Link>
        </li>
      )
      items.push(
        <li key={items.length} className="breadcrumb-item active">
          {page}
        </li>
      )
    } else {
      items.push(
        <li key={items.length} className="breadcrumb-item active">
          {movie.title}
        </li>
      )
    }
  } else {
    if (page) {
      items.push(
        <li key={items.length} className="breadcrumb-item">
          <Link href={`/movie-lists/${list._id}/movies`}>{list.title}</Link>
        </li>
      )
      items.push(
        <li key={items.length} className="breadcrumb-item active">
          {page}
        </li>
      )
    } else {
      items.push(
        <li key={items.length} className="breadcrumb-item active">
          {list.title}
        </li>
      )
    }
  }

  return (
    <nav>
      <ol className="breadcrumb">{items}</ol>
    </nav>
  )
}
