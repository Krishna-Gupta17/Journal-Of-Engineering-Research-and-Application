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

          <section className="indexing-logos" aria-labelledby="indexing-partners-title">
            <h2 id="indexing-partners-title">Indexing Partners</h2>
            <div className="indexing-logo-grid">
              <figure className="indexing-logo-card">
                <img
                  src="https://informaticsglobal.com/wp-content/uploads/2023/04/J-Gate_Logo.png"
                  alt="J-Gate indexing logo"
                  loading="lazy"
                />
                <figcaption>J-Gate</figcaption>
              </figure>

              <figure className="indexing-logo-card">
                <img
                  src="https://www.ilovephd.com/wp-content/uploads/2022/01/Multidisciplinary-UGC-CARE-List-of-Journals.png"
                  alt="UGC CARE List of Journals logo"
                  loading="lazy"
                />
                <figcaption>UGC CARE</figcaption>
              </figure>

              <figure className="indexing-logo-card">
                <img
                  src="https://blog.scienceopen.com/wp-content/uploads/2022/07/image-2.png"
                  alt="ScienceOpen logo"
                  loading="lazy"
                />
                <figcaption>ScienceOpen</figcaption>
              </figure>
            </div>
          </section>

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
