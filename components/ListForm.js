import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import _ from "lodash"
import { useSWRConfig } from "swr"

export function VHelp({ message }) {
  return <div className="invalid-feedback">{message}</div>
}

export function FieldLabel({ field, label, required }) {
  return (
    <label htmlFor={field} className="form-label col-sm-2 text-end">
      <strong>{_.upperFirst(label || field)} {required && <span className="text-danger">*</span>}</strong>
    </label>
  )
}

export function Field({field, message, label, required, children}){
  return (
    <div className="mb-3 row">
      <FieldLabel field={field} required={required} />
      <div className="has-validation col-sm-9">
        { children }
        <VHelp message={message} />
      </div>
    </div>
  )
}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  public: yup.boolean(),
})

export default function ListForm({ list }) {
  let { mutate } = useSWRConfig()
  let router = useRouter()
  let is_new = router.query.list === undefined
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: is_new
      ? {
        title: "",
        description: "",
        public: false,
      }
      : { ...list },
    validationSchema,
    onSubmit(values) {
      fetch(`/api/lists${is_new ? "" : "/" + list._id}`, {
        method: is_new ? "POST" : "PUT",
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText)

          mutate('/api/lists')
          toast.success(`Successfully ${is_new ? "created" : "updated"}`)
          router.push("/movie-lists")
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
    <form onSubmit={handleSubmit}>
      <div className="mb-3 row">
        <FieldLabel field="title" required />
        <div className="has-validation col-sm-9">
          <input type="text" {...fieldAttrs("title")} />
          <VHelp message={errors.title} />
        </div>
      </div>
      <div className="mb-3 row">
        <FieldLabel field="description" required />
        <div className="has-validation col-sm-9">
          <textarea {...fieldAttrs("description")} rows="6" />
          <VHelp message={errors.description} />
        </div>
      </div>
      <div className="mb-3 row">
        <FieldLabel field="public" />
        <div className="has-validation col-sm-9">
          <input type="checkbox" {...fieldAttrs('public')} 
                 className="form-check-input" checked={values['public']} onChange={(v) => {
            setFieldValue('public', v.target.checked)
          }} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-12 offset-sm-2 text-start">
          <button type="submit" className="btn btn-primary ms-1">Submit</button>
          <button type="button" className="btn btn-danger ms-2"
            onClick={() => router.push("/movie-lists")}>Cancel</button>
        </div>
      </div>
    </form>
  )
}
