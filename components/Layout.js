import Link from "next/link";

export default function Layout({ title, children }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link href="/movie-lists"><a className="navbar-brand">{title}</a></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/movie-lists"><a className="nav-link active">Home</a></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
      <footer className="container-fluid bg-dark fs-5 py-5 text-primary text-center">
        &copy; All rights reserved - Abdulmalek Al-Gahmi - WEB 3430
      </footer>
    </>
  )
}