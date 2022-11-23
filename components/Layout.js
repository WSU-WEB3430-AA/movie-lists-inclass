import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({ title, children }) {
  let {data: session} = useSession()
  console.log(session?.user)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link href="/movie-lists"><a className="navbar-brand">{title}</a></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex w-100">
              <li className="nav-item flex-grow-1">
                <Link href="/movie-lists"><a className="nav-link active">Home</a></Link>
              </li>

              {
                !session && <li className="nav-item">
                  <a className="nav-link" onClick={()=> signIn() }>Sing in</a>
                </li>
              }

              {
                session && <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={session.user.image} style={{ display: "inline", width: "30px" }} alt={session.user.name} />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><span className="dropdown-item">Welcome {session.user.name}</span></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={() => signOut()}>Sign out</a></li>
                  </ul>
              </li>
              }
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