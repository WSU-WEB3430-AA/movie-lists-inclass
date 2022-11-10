import { FaStar } from "react-icons/fa"

export default function StarRating({ rating, totalStars = 5 }) {
  return (
    <span className="d-flex">
      {
        [...Array(totalStars)].map((n, i) => (
         <FaStar key={i} color={i <= Math.floor(rating / 2) - 1 ? "maroon" : "grey"}></FaStar>
        ))
      }
    </span>
    )
}