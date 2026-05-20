import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const heroPhrase = '<Like a fight club for coders>';

function Home() {
  const [typedHero, setTypedHero] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedHero(heroPhrase);
      return undefined;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedHero(heroPhrase.slice(0, index));

      if (index >= heroPhrase.length) {
        window.clearInterval(timer);
      }
    }, 55);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="home-kicker">/Practice hard. Interview sharper./</p>
          <h1 className="typing-headline">
            <span className="typing-line">{typedHero}</span>
          </h1>
        </div>

        <div className="hero-side">
          <p>
            Build your future with coding problems, judged submissions, and an AI interview room
            that adapts to your CV, projects, and answers.
          </p>
          <Link className="home-arrow-link" to="/problems">
            Explore platform
          </Link>
        </div>

        <div className="hero-watermark" aria-hidden="true">
          code
        </div>
      </section>

      <div className="home-marquee" aria-hidden="true">
        <span>* master algorithms</span>
        <span>build interview confidence</span>
        <span>* ship better answers</span>
        <span>practice with code.arr</span>
      </div>

      <section className="home-stats-band">
        <div className="stats-title">
          <span className="spark-mark" aria-hidden="true"></span>
          <h2>
            Join The
            <br />
            Practice Loop
          </h2>
        </div>
        <div className="stat-item">
          <strong>100+</strong>
          <span>Problems Planned</span>
        </div>
        <div className="stat-item">
          <strong>AI</strong>
          <span>Mock Interviewer</span>
        </div>
        <div className="stat-item">
          <strong>24/7</strong>
          <span>Practice Flow</span>
        </div>
      </section>

      <section className="home-section">
        <p className="home-kicker">/Take a look at/</p>
        <h2>Popular <span className="symbol-dot small">*</span> Tracks</h2>

        <div className="track-tabs" aria-label="Learning track filters">
          <span>All</span>
          <span>Free</span>
          <span>DSA</span>
          <span>Interview</span>
          <span>AI Prep</span>
        </div>

        <div className="course-grid">
          <article className="course-card">
            <div className="course-label">* Free</div>
            <h3>Problem Solving Foundations</h3>
            <p>Start with arrays, strings, hash maps, and clean reasoning patterns.</p>
            <footer>
              <span>Beginner</span>
              <span>79 problems</span>
            </footer>
          </article>
          <article className="course-card">
            <div className="course-label">* Practice</div>
            <h3>JavaScript Coding Workspace</h3>
            <p>Run sample cases, submit code, and learn from clear verdicts.</p>
            <footer>
              <span>Intermediate</span>
              <span>Judge ready</span>
            </footer>
          </article>
          <article className="course-card accent-card">
            <div className="course-label">* AI</div>
            <h3>Adaptive Mock Interviews</h3>
            <p>Upload your CV, select a domain, and answer follow-up questions.</p>
            <footer>
              <span>Real-time</span>
              <span>CV based</span>
            </footer>
          </article>
        </div>
      </section>

      <section className="why-band">
        <div className="why-copy">
          <p className="home-kicker">/The platform/</p>
          <h2>Why <span className="symbol-dot small">*</span> code.arr?</h2>
          <p>
            It combines the workbench of a coding platform with the pressure and feedback loop of
            a real interview. You do not just solve. You explain, adapt, and improve.
          </p>
          <Link className="primary-link" to="/interview">
            Try AI Interview
          </Link>
        </div>

        <div className="abstract-stack" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    </main>
  );
}

export default Home;
