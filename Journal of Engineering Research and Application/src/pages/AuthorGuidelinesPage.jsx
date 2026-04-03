import Accordion from '../components/Accordion'
import PageHeader from '../components/PageHeader'
import { guidelineSections } from '../data/siteContent'

export default function AuthorGuidelinesPage() {
  return (
    <>
      <PageHeader
        title="Author Guidelines"
        subtitle="Prepare your manuscript using the following structure and submission requirements."
      />
      <section className="section">
        <div className="container narrow">
          <Accordion items={guidelineSections} />
        </div>
      </section>
    </>
  )
}
