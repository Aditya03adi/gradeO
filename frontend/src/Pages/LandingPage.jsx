import { Link } from "react-router-dom";

const highlights = [
  {
    tag: "Insights",
    title: "Track academic momentum with clarity",
    description:
      "See performance, tests, and marks in one place with a cleaner, more student-friendly experience.",
  },
  {
    tag: "Security",
    title: "Built for student-specific access",
    description:
      "Marks are scoped to the logged-in student, making the platform more private and trustworthy.",
  },
  {
    tag: "Flow",
    title: "From landing to dashboard in minutes",
    description:
      "A guided, inviting interface helps students sign in, explore, and stay focused on what matters.",
  },
];

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-shell">
        <header className="landing-nav">
          <Link to="/" className="brand-mark">
            <span className="brand-badge">gO</span>
            <span>gradeO</span>
          </Link>

          <div className="nav-actions">
            <Link to="/login" className="btn-link">
              Login
            </Link>
            <Link to="/signup" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </header>

        <section className="landing-hero">
          <div className="hero-copy">
            <div className="eyebrow">Academic visibility, redesigned</div>
            <h1 className="hero-title">
              Make performance tracking feel motivating, not mechanical.
            </h1>
            <p className="hero-subtitle">
              gradeO helps students and academic teams move through tests, marks, and
              department information with a calmer, more polished experience. It is built
              to feel trustworthy, bright, and easy to return to every day.
            </p>

            <div className="hero-actions">
              <Link to="/signup" className="btn-primary">
                Start Your Journey
              </Link>
              <Link to="/login" className="btn-link">
                Explore Login
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>Student-first</strong>
                <span>Private marks access for the logged-in learner</span>
              </div>
              <div className="hero-stat">
                <strong>Focused</strong>
                <span>Tests, info, and progress without clutter</span>
              </div>
              <div className="hero-stat">
                <strong>Inviting</strong>
                <span>A friendlier visual experience across the app</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />

            <div className="hero-visual-card hero-visual-main">
              <div className="hero-visual-top">
                <span className="pill">Inviting Interface</span>
                <span className="hero-visual-badge">gradeO Preview</span>
              </div>
              <h3>One academic space for tests, marks, and department insights</h3>
              <p>
                A more polished experience helps students move through the platform with
                confidence, clarity, and less friction.
              </p>

              <div className="hero-preview-stack">
                <div className="hero-preview-card">
                  <div className="hero-preview-heading">
                    <strong>What students can do inside gradeO</strong>
                    <span>At a glance</span>
                  </div>
                  <div className="hero-preview-actions">
                    <span className="hero-preview-action">Open dashboard</span>
                    <span className="hero-preview-action">Check tests</span>
                    <span className="hero-preview-action">View marks</span>
                  </div>
                </div>

                <div className="hero-preview-row">
                  <div className="hero-preview-mini">
                    <span className="hero-visual-label">Secure Marks</span>
                    <strong>Private by design</strong>
                  </div>
                  <div className="hero-preview-mini">
                    <span className="hero-visual-label">Quick Access</span>
                    <strong>PRN-based login</strong>
                  </div>
                </div>

                <div className="hero-preview-list">
                  <div className="hero-preview-item">
                    <span className="hero-preview-dot" />
                    <span>Department-specific academic information for better focus</span>
                  </div>
                  <div className="hero-preview-item">
                    <span className="hero-preview-dot" />
                    <span>Secure access that keeps each student limited to their own marks</span>
                  </div>
                  <div className="hero-preview-item">
                    <span className="hero-preview-dot" />
                    <span>Cleaner screens that make routine academic tasks feel lighter</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-visual-grid">
              <div className="hero-visual-card">
                <span className="hero-visual-label">Private Access</span>
                <strong>Student-only marks</strong>
              </div>
              <div className="hero-visual-card">
                <span className="hero-visual-label">Focused View</span>
                <strong>Department-filtered tests</strong>
              </div>
              <div className="hero-visual-card">
                <span className="hero-visual-label">Smooth Flow</span>
                <strong>Fast login to dashboard</strong>
              </div>
              <div className="hero-visual-card">
                <span className="hero-visual-label">Clear Design</span>
                <strong>Calm, modern academic UI</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-grid">
          {highlights.map((item) => (
            <article key={item.title} className="landing-feature">
              <div className="landing-feature-icon">{item.tag.slice(0, 1)}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="landing-cta">
          <div className="landing-cta-row">
            <div>
              <h2>Step into a more polished academic experience</h2>
              <p>
                Sign in to see your branch-specific tests, your secure marks view, and a
                refreshed interface designed to feel clear and energizing.
              </p>
            </div>
            <div className="nav-actions">
              <Link to="/login" className="btn-primary">
                Go to Login
              </Link>
              <Link to="/dashboard" className="btn-link">
                Open Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
