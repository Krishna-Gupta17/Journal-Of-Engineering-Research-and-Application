import PageHeader from '../components/PageHeader'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="An initiative by academicians, researchers, and professionals in civil engineering."
      />

      <section className="section">
        <div className="container narrow">

          {/* Intro */}
          <p className="lead">
            <strong>Journal of Engineering Research and Application (JERA)</strong> is a
            peer-reviewed academic journal primarily focused on civil and structural engineering.
            The journal also welcomes high-quality research across all related domains that address
            real-world engineering challenges from both practical and theoretical perspectives.
          </p>

          {/* Objective */}
          <p>
            The primary objective of JERA is to publish original research with strong novelty,
            technical depth, and practical relevance. The journal aims to support designers,
            consultants, researchers, and policy-makers by providing valuable insights and
            innovative engineering solutions.
          </p>

          {/* Mission & Vision Section */}
          <div className="grid-2 mt-4">
            <div className="card">
              <h3>Our Mission</h3>
              <p>
                To create a reliable and high-quality platform for publishing impactful engineering
                research that contributes to solving real-world civil engineering problems.
              </p>
            </div>

            <div className="card">
              <h3>Our Vision</h3>
              <p>
                To become a globally recognized journal in engineering research by promoting
                innovation, collaboration, and academic excellence.
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mt-5">
            <h2 className="section-title">Key Highlights</h2>
            <ul className="styled-list">
              <li>Peer-reviewed and quality-focused publication process</li>
              <li>Coverage of both theoretical and practical engineering research</li>
              <li>Fast and transparent review system</li>
              <li>Open platform for academicians, researchers, and industry professionals</li>
              <li>Emphasis on innovation and real-world applications</li>
            </ul>
          </div>

          {/* Closing Statement */}
          <div className="mt-4">
            <p>
              JERA is an initiative by a collaborative group of academicians, researchers, and
              professionals working in the field of civil engineering. The journal is committed to
              providing a centralized and efficient platform for the timely dissemination of
              research work to a global audience.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}