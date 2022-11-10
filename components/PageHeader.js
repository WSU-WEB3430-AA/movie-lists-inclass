export default function PageHeader({ title, children, extra }){
  return (
    <div className="m5-y">
      <div className="d-flex mt-3 mb-4 pb-3 border-bottom border-3 border-primary">
        <div className="flex-grow-1">
          <h3>{title}</h3>
        </div>
        <div>{extra}</div>
      </div>

      {children}
    </div>
  )
}