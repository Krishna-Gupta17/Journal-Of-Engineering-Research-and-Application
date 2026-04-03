import PageHeader from '../components/PageHeader'
import { scopeSubjects } from '../data/siteContent'

const scopeImages = [
  {
    src: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=900&q=80',
    alt: 'Urban skyline with modern tall buildings',
  },
  {
    src: 'https://images.unsplash.com/photo-1581092919535-7146ff1a590d?auto=format&fit=crop&w=900&q=80',
    alt: 'Road and highway infrastructure network',
  },
  {
    src: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=900&q=80',
    alt: 'Concrete works in a civil engineering project',
  },
  {
    src: 'https://images.unsplash.com/photo-1581092446327-9d5a3b4f3f4b?auto=format&fit=crop&w=900&q=80',
    alt: 'Computational simulation visual on screen',
  },
]

const acceptedTypes = ['Research Paper', 'Review Paper', 'Technical Note', 'Short Note']

export default function AimScopePage() {
  return (
    <>
      <PageHeader
        title="Aim & Scope"
        subtitle="A unique global platform for civil engineering and allied research publication."
      />

      <section className="section">
        <div className="container narrow">
          <p className="lead-copy">
            The Journal of Engineering Research and Application provides a unique platform to
            publish your research at one location where people from all around the world can
            access your publication. The journal welcomes articles in all areas of engineering.
          </p>
          <p>
            JERA accepts submissions in the form of research paper, review paper, technical note,
            and short note. The main objective of this journal is to publish high-quality work
            after peer review and provide meaningful technical value for researchers,
            academicians, and professionals.
          </p>

          <div className="type-pills" aria-label="Accepted article types">
            {acceptedTypes.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="subjects-title">
        <div className="container">
          <h2 id="subjects-title">Basic Subjects (Not Limited To)</h2>
          <ul className="subject-list">
            {scopeSubjects.map((subject) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <h2 id="gallery-title">Visual Domains in Focus</h2>
          <p className="gallery-intro">
            Featured areas include tall buildings, computational fluid dynamics, transport
            corridors, and concrete or geotechnical infrastructure systems.
          </p>
          <div className="image-grid">
            {scopeImages.map((image, index) => (
              <figure key={image.src} className="image-card">
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption>Domain View {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
