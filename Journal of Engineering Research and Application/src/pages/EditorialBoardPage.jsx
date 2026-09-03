import PageHeader from '../components/PageHeader'
import { editorialBoard } from '../data/siteContent'

function BoardSection({ title, description, members }) {
  return (
    <section className="editorial-section" aria-labelledby={`${title.replace(/\s+/g, '-')}-title`}>
      <h2 id={`${title.replace(/\s+/g, '-')}-title`}>{title}</h2>
      {description && <p className="editorial-description" style={{ marginBottom: '1.5rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{description}</p>}
      <div className="card-grid card-grid-2">
        {members.map((member) => (
          <article className="person-card" key={`${title}-${member.name}`}>
            <h3>{member.name}</h3>
            {member.role && <p className="person-role">{member.role}</p>}
            {member.institution && <p>{member.institution}</p>}
            {member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}
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
          {editorialBoard.map((section, index) => (
            <BoardSection 
              key={index}
              title={section.title} 
              description={section.description}
              members={section.members} 
            />
          ))}
        </div>
      </section>
    </>
  )
}
