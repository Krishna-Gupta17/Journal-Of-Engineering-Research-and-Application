import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-grid">
        <div className="footer-logo-section">
          <img src="/Jeralogo.jpeg" alt="JERA Logo" className="footer-logo" />
          <div>
            <h3>Journal of Engineering Research and Application</h3>
            <p>
              A peer-reviewed open access journal focused on advancing civil engineering
              research and professional practice.
            </p>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h4>Quick Navigation</h4>
          <ul>
            <li>
              <Link to="/aim-scope">Aim &amp; Scope</Link>
            </li>
            <li>
              <Link to="/submission">Submission</Link>
            </li>
            <li>
              <Link to="/issues">Archives</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h4>Social</h4>
          <ul className="social-links" aria-label="Social links">
            <li>
              <a href="#" aria-label="Twitter">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" aria-label="Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} JERA. All rights reserved.</p>
    </footer>
  )
}
