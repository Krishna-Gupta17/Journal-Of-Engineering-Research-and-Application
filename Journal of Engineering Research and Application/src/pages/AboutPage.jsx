import { Link } from 'react-router-dom'
import InfoCard from '../components/InfoCard'

export default function AboutPage() {
  return (
    <>
      {/* HERO SECTION (same as homepage style) */}
      <section className="hero" aria-labelledby="about-title">
        <div className="container hero-grid">

          <div>
            <p className="eyebrow">About JERA</p>

            <h1 id="about-title">
              Journal of Engineering Research and Application
            </h1>

            <p className="tagline">
              An International Peer-Reviewed Journal for Civil and Structural Engineering
            </p>

            <p className="hero-copy">
              Journal of engineering research and application is a peer review journal mainly
              concentrated to civil and structural engineering however, the journal of engineering
              research and application accepts in the paper in all the related field of the civil engineering.
            </p>

            <div className="cta-row">
              <Link className="btn btn-primary" to="/submission">
                Submit Paper
              </Link>

              <Link className="btn btn-outline" to="/issues">
                View Issues
              </Link>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="hero-panel" aria-hidden="true">
            <h2>Key Features</h2>
            <ul>
              <li>✔ Peer-reviewed journal</li>
              <li>✔ Civil & structural engineering focus</li>
              <li>✔ Practical + theoretical research</li>
              <li>✔ Timely publication</li>
            </ul>
          </div>

        </div>
      </section>

      {/* OBJECTIVE SECTION */}
      <section className="section" aria-labelledby="objective-title">
        <div className="container narrow">

          <h2 id="objective-title">Objective</h2>

          <p className="about-text">
            The main objective of this journal is to accept the paper which is having the enough
            novelty in the article related to the civil engineering problems which are helpful
            from the practical aspects to the theorical aspects. The article is helpful for the
            designer in various areas of the engineering.
          </p>

        </div>
      </section>

      {/* INITIATIVE + CARDS */}
      <section className="section alt" aria-labelledby="initiative-title">
        <div className="container">

          <h2 id="initiative-title">Our Initiative</h2>

          <div className="card-grid card-grid-3">
            <InfoCard
              title="Collaborative Network"
              text="Journal of engineering research and application is an initiative by the collaborative group of academician, researcher and professional working in the field of civil engineering."
            />

            <InfoCard
              title="Centralized Platform"
              text="The journal aims to publish the article in a timely way and in one place."
            />

            <InfoCard
              title="Engineering Impact"
              text="The article is helpful for the designer in various areas of the engineering."
            />
          </div>

        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="section" aria-labelledby="quick-links-title">
        <div className="container">

          <h2 id="quick-links-title">Quick Access</h2>

          <div className="quick-links">
            <Link to="/submission">Submit Manuscript</Link>
            <Link to="/editorial-board">Editorial Board</Link>
            <Link to="/issues">Current Issue</Link>
            <Link to="/author-guidelines">Author Guidelines</Link>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section cta-section">
        <div className="container text-center">

          <h2>Be a Part of Engineering Research</h2>

          <p>
            Contribute your research and help solve real-world civil engineering challenges.
          </p>

          <Link to="/submission" className="btn btn-primary">
            Submit Your Paper
          </Link>

        </div>
      </section>
    </>
  )
}