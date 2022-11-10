import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { Field } from "./ListForm"
import DatePicker from "react-datepicker"
import AddableMovies from "./AddableMovies"

const validationSchema = yup.object({
  year: yup.number().required().min(1900).max(new Date().getFullYear()),
  title: yup.string().required(),
  poster: yup.string().url().required(),
  plot: yup.string().required(),
  releaseDate: yup.date().required(),
  genre: yup
    .string()
    .oneOf([
      "Action",
      "Adventure",
      "Fantasy",
      "Drama",
      "Comedy",
      "Family",
      "Science Fiction",
      "Romance",
      "Animation",
      "History",
      "Thriller",
      "Western",
      "Horror",
      "Musical",
      "Documentary",
      "Biography",
      "Mystery",
    ])
    .required(),
  rated: yup.string().oneOf(["G", "PG", "PG-13", "R", "NR"]).required(),
  rating: yup.number().min(0.0).max(10.0).required(),
  votes: yup.number().min(0),
})

export default function MovieForm({ list, movie }) {
  let router = useRouter()
  let { list: lid, movie: mid } = router.query
  let is_new = mid === undefined
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: is_new
      ? {
        year: new Date().getFullYear(),
        title: "",
        poster: "",
        plot: "",
        releaseDate: "",
        review: "",
        votes: 0,
        rating: 0.0,
      }
      : { ...movie },
    validationSchema,
    onSubmit(values) {
      fetch(`/api/lists/${lid}/movies${is_new ? "" : "/" + mid}`, {
        method: is_new ? "POST" : "PUT",
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText)
          toast.success(`Successfully ${is_new ? "created" : "updated"}`)
          router.push(is_new
            ? `/movie-lists/${lid}/movies`
            : `/movie-lists/${lid}/movies/${mid}`)
        })
        .catch((err) => {
          toast.error(`Failed to submit your message: ${err.message}`)
        })
    },
  })

  function fieldAttrs(field) {
    return {
      className: `form-control ${errors[field] ? "is-invalid" : ""}`,
      id: field,
      name: field,
      value: values[field],
      onChange: handleChange
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field field="year" message={errors.year} required>
          <input type="number" {...fieldAttrs("year")} />
        </Field>
        <Field field="title" message={errors.title} required>
          <input type="text" {...fieldAttrs("title")} />
        </Field>
        <Field field="poster" message={errors.poster} required>
          <input type="url" {...fieldAttrs("poster")} />
        </Field>
        <Field field="plot" message={errors.plot} required>
          <textarea {...fieldAttrs("plot")} rows="6" />
        </Field>
        <Field field="genre" message={errors.genre} required>
          <select {...fieldAttrs('genre')}>
            <option value="">Not selected</option>
            {validationSchema.fields['genre'].describe().oneOf.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field field="releaseDate" message={errors.releaseDate} required>
          <DatePicker {...fieldAttrs('releaseDate')}
            selected={values.releaseDate}
            onChange={(date) => setFieldValue('releaseDate', date)}
          />
        </Field>

        <Field field="rated" message={errors.rated} required>
          <select {...fieldAttrs('rated')}>
            <option value="">Not selected</option>
            {validationSchema.fields['rated'].describe().oneOf.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
          </select>
        </Field>

        <Field field="rating" message={errors.rating} required>
          <input type="number" {...fieldAttrs("rating")} />
        </Field>

        <Field field="votes" message={errors.votes}>
          <input type="number" {...fieldAttrs("votes")} />
        </Field>

        <div className="mb-3 row">
          <div className="col-sm-12 offset-sm-2 text-start">
            <button type="submit" className="btn btn-primary ms-1">Submit</button>
            <button type="button" className="btn btn-danger ms-2"
              onClick={() => router.push(is_new
                ? `/movie-lists/${lid}/movies`
                : `/movie-lists/${lid}/movies/${mid}`)}>Cancel</button>
          </div>
        </div>
      </form>
      {is_new && <AddableMovies list={lid} />}
    </>

  )
}