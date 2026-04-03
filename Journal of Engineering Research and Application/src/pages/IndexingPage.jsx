import PageHeader from '../components/PageHeader'

export default function IndexingPage() {
  return (
    <>
      <PageHeader
        title="Indexing"
        subtitle="JERA is a newly established journal and currently under indexing process."
      />

      <section className="section">
        <div className="container narrow">
          <p>
            Journal of Engineering Research and Application is actively working with indexing
            agencies to be included in major scholarly databases. The editorial team is committed
            to improving discoverability, citation visibility, and international research reach.
          </p>

          <article className="license-card" aria-labelledby="cc-license-title">
            <h2 id="cc-license-title">Creative Commons License</h2>
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
              <img
                alt="Creative Commons License"
                src="https://i.creativecommons.org/l/by/4.0/88x31.png"
              />
            </a>
            <p>
              This work is licensed under a{' '}
              <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                Creative Commons Attribution 4.0 International License
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
