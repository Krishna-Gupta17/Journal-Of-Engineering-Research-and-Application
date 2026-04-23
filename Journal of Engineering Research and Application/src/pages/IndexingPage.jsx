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
              <a 
                href="https://search.crossref.org/?q=+2583-3987&from_ui=yes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="indexing-logo-link"
              >
                <figure className="indexing-logo-card">
                  <img
                    src="https://assets.crossref.org/logo/crossref-logo-landscape-100.png"
                    alt="Crossref indexing logo"
                    loading="lazy"
                  />
                  <figcaption>
                    Crossref
                    <svg className="external-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </figcaption>
                </figure>
              </a>

              <a 
                href="https://openalex.org/S4387280128" 
                target="_blank" 
                rel="noopener noreferrer"
                className="indexing-logo-link"
              >
                <figure className="indexing-logo-card">
                  <img
                    src="https://openalex.org/img/tricon.a08e3fec.png"
                    alt="Openalex logo"
                    loading="lazy"
                  />
                  <figcaption>
                    Openalex
                    <svg className="external-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </figcaption>
                </figure>
              </a>

              <a 
                href="https://www.sudoc.fr/263957594" 
                target="_blank" 
                rel="noopener noreferrer"
                className="indexing-logo-link"
              >
                <figure className="indexing-logo-card">
                  <img
                    src="https://www.sudoc.abes.fr/htdocs/psi_images/img_psi/3.0/logos/abes_logo.gif"
                    alt="Sudoc logo"
                    loading="lazy"
                  />
                  <figcaption>
                    Sudoc
                    <svg className="external-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </figcaption>
                </figure>
              </a>
            </div>
          </section>

          <article className="license-card" aria-labelledby="cc-license-title">
            <h2 id="cc-license-title">Creative Commons License</h2>
            <a rel="license"  href="http://creativecommons.org/licenses/by/4.0/">
              <img
                alt="Creative Commons License"
                src="https://i.creativecommons.org/l/by/4.0/88x31.png"
              />
            </a>
            <p>
              This work is licensed under a{' '}
              <a
                rel="license noopener noreferrer"
                target="_blank"
                href="http://creativecommons.org/licenses/by/4.0/"
              >
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
