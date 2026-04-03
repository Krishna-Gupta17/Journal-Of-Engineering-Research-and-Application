export default function InfoCard({ title, text, detail }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      {detail ? <p className="card-detail">{detail}</p> : null}
      <p>{text}</p>
    </article>
  )
}
