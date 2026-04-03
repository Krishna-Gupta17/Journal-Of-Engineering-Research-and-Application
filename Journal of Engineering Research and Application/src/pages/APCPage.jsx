import PageHeader from '../components/PageHeader'

export default function APCPage() {
  return (
    <>
      <PageHeader
        title="APC (Article Processing Charges)"
        subtitle="How open access publishing is supported at JERA."
      />

      <section className="section">
        <div className="container narrow">
          <h2>Why APC Exists</h2>
          <p>
            Traditional journals typically follow a reader-pays model, while JERA publishes open
            access content. Since articles are freely available online, APC supports the costs of
            editorial and publication services required to maintain quality and platform
            reliability.
          </p>

          <h2>What APC Covers</h2>
          <ul className="subject-list compact">
            <li>Editorial work and manuscript handling</li>
            <li>Peer review administration</li>
            <li>Administrative and publication support</li>
            <li>Journal development and commissioning activities</li>
            <li>Technical infrastructure, innovation, and platform operations</li>
          </ul>

          <h2>Payment Process</h2>
          <p>
            APC becomes payable after editorial acceptance in principle. The corresponding author
            is notified and can arrange payment through the author, institution, funder, or
            employer. Publication proceeds once formatting checks and payment confirmation are
            complete.
          </p>
        </div>
      </section>
    </>
  )
}
