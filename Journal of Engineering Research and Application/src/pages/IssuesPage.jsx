import InfoCard from '../components/InfoCard'
import PageHeader from '../components/PageHeader'
import { issueCards } from '../data/siteContent'

export default function IssuesPage() {
  return (
    <>
      <PageHeader
        title="Issues"
        subtitle="Browse current and archived issues of the journal."
      />
      <section className="section">
        <div className="container">
          <div className="card-grid card-grid-2">
            {issueCards.map((issue) => (
              <InfoCard
                key={issue.title}
                title={issue.title}
                detail={issue.detail}
                text={issue.text}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
