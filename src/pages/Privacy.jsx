import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './Privacy.scss';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Vedant Bende</title>
        <meta name="description" content="Privacy policy for Vedant Bende's portfolio website." />
      </Helmet>

      <main className="privacy-page" id="privacy-page">
        <section className="privacy-page__hero section section-full">
          <div className="container">
            <h1 className="privacy-page__heading text-display">Privacy Policy</h1>
          </div>
        </section>

        <section className="privacy-page__content section">
          <div className="container">
            <div className="privacy-page__body">
              <h2>Information Collection</h2>
              <p>
                This portfolio website does not collect, store, or process any
                personal data from visitors. There are no forms, cookies, analytics
                trackers, or third-party data collection services embedded in this
                site.
              </p>

              <h2>External Links</h2>
              <p>
                This website may contain links to external services such as GitHub
                and LinkedIn. These third-party sites have their own privacy
                policies, and I am not responsible for their content or practices.
              </p>

              <h2>Hosting</h2>
              <p>
                This website is hosted on Vercel. Vercel may collect standard web
                server logs (IP address, browser type, access times) as part of
                their infrastructure. Please refer to{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vercel&apos;s Privacy Policy
                </a>{' '}
                for details.
              </p>

              <h2>Contact</h2>
              <p>
                If you have questions about this privacy policy, you can reach me
                at{' '}
                <a href="mailto:vedantbende.dev@gmail.com">
                  vedantbende.dev@gmail.com
                </a>
                .
              </p>

              <div className="privacy-page__back">
                <Link to="/" className="privacy-page__back-link">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
