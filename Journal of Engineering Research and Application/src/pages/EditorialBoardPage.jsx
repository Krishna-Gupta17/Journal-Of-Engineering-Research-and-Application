import PageHeader from '../components/PageHeader'
import { editorialBoard } from '../data/siteContent'

function BoardSection({ title, members }) {
  return (
    <section className="editorial-section" aria-labelledby={`${title}-title`}>
      <h2 id={`${title}-title`}>{title}</h2>
      <div className="card-grid card-grid-2">
        {members.map((member) => (
          <article className="person-card" key={`${title}-${member.name}`}>
            <h3>{member.name}</h3>
            <p className="person-role">{member.role}</p>
            <p>{member.institution}</p>
            <a href={`mailto:${member.email}`}>{member.email}</a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function EditorialBoardPage() {
  return (
    <>
      <PageHeader
        title="Editorial Board"
        subtitle="A multidisciplinary team ensuring editorial rigor and publication quality."
      />
      <section className="section">
        <div className="container">
          <BoardSection title="Editor in Chief" members={editorialBoard.editorInChief} />
          <BoardSection title="Managing Editor" members={editorialBoard.managingEditor} />
          <BoardSection title="Editorial Team" members={editorialBoard.editorialTeam} />
          <BoardSection title="Handling Editor" members={editorialBoard.handlingEditor} />
          <BoardSection title="Editorial Staff" members={editorialBoard.editorialStaff} />
        </div>
      </section>
    </>
  )
}
