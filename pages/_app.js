import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import "react-datepicker/dist/react-datepicker.css"
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import {SessionProvider} from 'next-auth/react'

export const fetcher = (...args) => fetch(...args).then(async res => {
  return JSON.parse(await res.text(), (key, value) => {
    const dataFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/ 
    if (typeof value === "string" && dataFormat.test(value)){
      return new Date(value)
    }

    return value
  })
})

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  useEffect(() => { // Make sure this function runs in the the browser
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return <SessionProvider session={session}>
    <ToastContainer />
    <Component {...pageProps} />
  </SessionProvider>
  
  
}

export default MyApp
