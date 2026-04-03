export default function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header" aria-labelledby="page-title">
      <div className="container">
        <p className="eyebrow">Journal of Engineering Research and Application</p>
        <h1 id="page-title">{title}</h1>
        {subtitle ? <p className="page-intro">{subtitle}</p> : null}
      </div>
    </header>
  )
}
