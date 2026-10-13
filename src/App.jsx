import { useEffect, useState } from "react";
import { Link, NavLink, Routes, Route, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Linkedin,
  MapPin,
  Download,
  MoveUpRight,
  Printer,
  Globe2,
  Mail,
} from "lucide-react";
import {
  profile,
  ventures,
  career,
  education,
  capabilities,
  stories,
} from "./data";

const Motion = motion;
const enter = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <Motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={reduced ? { show: { opacity: 1 } } : enter}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}
function ScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ behavior: "smooth" }),
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}
function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Anna Rossa Zalewski home">
      <span className="logo-symbol">
        AR<span>.</span>
      </span>
      <span className="logo-type">
        ANNA ROSSA
        <br />
        ZALEWSKI
      </span>
    </Link>
  );
}
const CV_PDF_URL = `${import.meta.env.BASE_URL}Anna_Rossa_Zalewski_Rose_CV.pdf`;

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav
          aria-label="Main navigation"
          className={"nav " + (open ? "open" : "")}
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/ventures">Ventures</NavLink>
          <NavLink to="/stories">My Stories</NavLink>
          <NavLink to="/leadership">Leadership</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <a
            href={CV_PDF_URL}
            className="nav-cv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Anna Rossa Zalewski CV PDF"
          >
            View CV <ArrowUpRight size={15} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="eyebrow inverse">LET'S CONNECT</p>
            <h2>
              Great things begin
              <br />
              <em>with a conversation.</em>
            </h2>
            <Link
              to="/contact"
              className="round-link"
              aria-label="Contact Anna"
            >
              <ArrowUpRight size={30} />
            </Link>
          </div>
          <div className="footer-links">
            <p>EXPLORE</p>
            <Link to="/about">About</Link>
            <Link to="/ventures">Ventures</Link>
            <Link to="/stories">My Stories</Link>
            <Link to="/leadership">Leadership</Link>
            <a href={CV_PDF_URL} target="_blank" rel="noopener noreferrer">
              Curriculum Vitae
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Anna Rossa Zalewski</span>
          <span>Doha, Qatar · International ventures</span>
          <span>Built with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
function SectionHeading({ eyebrow, title, sub, aside }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {sub && <p className="section-desc">{sub}</p>}
      </div>
      {aside}
    </div>
  );
}
// Resolve files from public/ on local Vite and GitHub Pages subpaths.
// External CDN URLs are kept unchanged.
function publicAsset(url) {
  if (!url) return url;
  if (/^(?:https?:)?\/\//i.test(url) || /^(?:data:|blob:)/i.test(url))
    return url;
  return `${import.meta.env.BASE_URL}${String(url).replace(/^\/+/, "")}`;
}

function Portrait({ className = "" }) {
  const [hasImage, setHasImage] = useState(true);
  return (
    <div className={"portrait " + className}>
      <div className="portrait-art">
        <div className="portrait-circle" />
        <div className="portrait-monogram">AR</div>
        <div className="portrait-rule" />
      </div>
      {hasImage && (
        <img
          src={publicAsset("anna-portrait.jpg")}
          alt="Portrait of Anna Rossa Zalewski"
          onError={() => setHasImage(false)}
        />
      )}
      <span className="portrait-label">FOUNDER / MANAGING DIRECTOR</span>
    </div>
  );
}
function VentureCard({ item, index }) {
  return (
    <Link to={"/ventures/" + item.id} className="venture-card">
      <div className={"venture-visual " + item.visual}>
        <span className="venture-initial">{item.initial}</span>
        <span className="visual-caption">{item.category}</span>
        <span className="visual-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="venture-meta">
        <span>
          {item.number} / {item.region}
        </span>
        <span>{item.years}</span>
      </div>
      <h3>{item.name}</h3>
      <p>{item.summary}</p>
      <span className="text-link">
        Explore venture <ArrowUpRight size={16} />
      </span>
    </Link>
  );
}
function StoryVisual({ story }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(story.image) && !failed;
  return (
    <div
      className={
        "story-art story-art--" +
        story.theme +
        (showImage ? " story-art--photo" : "")
      }
    >
      {showImage && (
        <img
          className="story-art-photo"
          src={publicAsset(story.image)}
          alt={story.imageAlt || story.name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {!showImage && (
        <>
          <span className="story-art-orbit" />
          <span className="story-art-word">{story.name}</span>
          <div className="story-art-shape" />
        </>
      )}
      <span className="story-art-chapter">{story.chapter} / THE STORY</span>
      <span className="story-art-caption">{story.tag}</span>
    </div>
  );
}
function StoryChapter({ story }) {
  return (
    <article
      className={"story-chapter story-chapter--" + story.theme}
      id={story.id}
    >
      <div className="container story-chapter-grid">
        <Reveal className="story-chapter-image">
          <StoryVisual story={story} />
        </Reveal>
        <div className="story-chapter-copy">
          <Reveal>
            <p className="eyebrow">
              CHAPTER {story.chapter} <span className="story-chapter-line" />{" "}
              {story.kicker}
            </p>
            <p className="story-name">{story.name}</p>
            <h2>{story.title}</h2>
            <blockquote>{story.pull}</blockquote>
            {story.paragraphs.map((paragraph, i) => (
              <p key={i} className="story-paragraph">
                {paragraph}
              </p>
            ))}
            <div className="story-closing">
              <div>
                <strong>{story.stat}</strong>
                <span>{story.statLabel}</span>
              </div>
              <Link to={"/ventures/" + story.id} className="inline-action">
                Explore {story.name} <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
function Stories({ embedded = false }) {
  return (
    <div
      className={"story-journey" + (embedded ? " story-journey--embedded" : "")}
    >
      {!embedded && (
        <section className="story-intro">
          <div className="container story-intro-inner">
            <Reveal>
              <p className="eyebrow">THE STORIES BEHIND THE VENTURES</p>
              <h1>
                Every venture starts
                <br />
                with <em>a feeling.</em>
              </h1>
              <p>
                These are not simply businesses I founded. They are chapters of
                my life — shaped by what I love, what I believe in, and what I
                hope to bring into the world.
              </p>
              <a className="story-scroll" href="#rebel-angels">
                Begin the journey <ArrowDown size={18} />
              </a>
            </Reveal>
            <span className="story-intro-index">01 — 03</span>
          </div>
        </section>
      )}
      {stories.map((story) => (
        <StoryChapter key={story.id} story={story} />
      ))}
      <section className="story-end">
        <div className="container">
          <Reveal>
            <p className="eyebrow inverse">THE THREAD THAT CONNECTS IT ALL</p>
            <h2>
              Different ventures.
              <br />
              <em>One belief in living well.</em>
            </h2>
            <p>
              Creating spaces, experiences and opportunities that matter to
              people.
            </p>
            <Link to="/contact" className="btn btn-story">
              Let’s connect <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <Reveal>
              <p className="eyebrow">
                <span className="dot" /> INTERNATIONAL BUSINESS LEADER
              </p>
              <h1>
                Leading with
                <br />
                <span className="serif-line">vision.</span>
                <br />
                Building with
                <br />
                <span className="serif-line silver">purpose.</span>
              </h1>
              <p className="hero-desc">
                I’m Anna Rossa Zalewski — an entrepreneur and business
                strategist building ventures across industries, markets and
                borders.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-dark" to="/ventures">
                  Explore my ventures <ArrowUpRight size={17} />
                </Link>
                <Link className="btn btn-outline" to="/about">
                  Discover my story <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="hero-media" delay={0.12}>
            <Portrait />
            <div className="hero-corner">
              <span>BASED IN</span>
              <strong>
                DOHA <ArrowUpRight size={15} />
              </strong>
              <span>QATAR</span>
            </div>
          </Reveal>
        </div>
        <div className="container hero-lower">
          <span>
            ENTREPRENEURSHIP <span className="divider-dot">✳</span> LEADERSHIP{" "}
            <span className="divider-dot">✳</span> INTERNATIONAL GROWTH
          </span>
          <a href="#intro" aria-label="Scroll to introduction">
            SCROLL TO EXPLORE <ArrowDown size={16} />
          </a>
        </div>
      </section>
      <section id="intro" className="section intro-section">
        <div className="container intro-grid">
          <Reveal>
            <p className="eyebrow">01 / INTRODUCTION</p>
            <h2>
              Creating opportunities.
              <br />
              <span className="muted">Connecting worlds.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="large-copy">
              Business, at its best, is about people, possibility, and the
              courage to build something meaningful.
            </p>
            <p>
              With a portfolio spanning hydration, youth sports, hospitality,
              real estate, international trade and textiles, I bring an
              international perspective to every venture — combining strategic
              ambition with practical leadership.
            </p>
            <Link className="inline-action" to="/about">
              More about me <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="metrics-strip">
        <div className="container metrics-grid">
          <div>
            <strong>06</strong>
            <span>Entrepreneurial ventures</span>
          </div>
          <div>
            <strong>870+</strong>
            <span>Young athletes served*</span>
          </div>
          <div>
            <strong>11</strong>
            <span>School partnerships*</span>
          </div>
          <div>
            <strong>03+</strong>
            <span>Core operating regions</span>
          </div>
        </div>
        <p className="metric-note container">
          * Rebel Angels Gymnastics Academy figures as provided in the executive
          CV.
        </p>
      </section>
      <section className="section venture-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="02 / THE PORTFOLIO"
              title={
                <>
                  Businesses built on <span className="muted">purpose.</span>
                </>
              }
              sub="Independent ventures, connected by a commitment to thoughtful growth."
              aside={
                <Link to="/ventures" className="inline-action">
                  View all ventures <ArrowUpRight size={18} />
                </Link>
              }
            />
          </Reveal>
          <div className="venture-grid">
            {ventures.slice(0, 4).map((item, i) => (
              <Reveal key={item.id} delay={(i % 2) * 0.09}>
                <VentureCard item={item} />
              </Reveal>
            ))}
          </div>
          <Link className="btn btn-outline center-btn" to="/ventures">
            Explore all six ventures <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="story-home-invite">
        <div className="container story-home-layout">
          <Reveal>
            <p className="eyebrow">THE STORY BEHIND THE WORK</p>
            <h2>
              Not just what I build.
              <br />
              <em>Why I began.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Behind each venture is a personal story: a lifelong love of
              gymnastics, an appreciation for meaningful hospitality, and a
              belief that everyday well-being deserves more attention.
            </p>
            <Link to="/stories" className="inline-action">
              Read my stories <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="statement-section">
        <div className="container statement-inner">
          <Reveal>
            <p className="eyebrow inverse">MY APPROACH</p>
            <h2>
              Ideas inspire.
              <br />
              People build.
              <br />
              <em>Purpose sustains.</em>
            </h2>
            <p>
              Long-term value begins with authentic relationships, clear
              direction, and the confidence to see new possibilities.
            </p>
          </Reveal>
          <div className="statement-ring">
            AR<span>✳</span>
          </div>
        </div>
      </section>
      <section className="section expertise-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="03 / MY EXPERTISE"
              title={
                <>
                  A broad perspective.
                  <br />
                  <span className="muted">One clear direction.</span>
                </>
              }
            />
          </Reveal>
          <div className="capability-list">
            {capabilities.map((s, i) => (
              <Reveal key={s}>
                <div className="capability-row">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s}</h3>
                  <MoveUpRight size={21} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section contact-banner">
        <div className="container banner-inner">
          <div>
            <p className="eyebrow">WHAT'S NEXT?</p>
            <h2>
              Let’s build something
              <br />
              <em>meaningful together.</em>
            </h2>
          </div>
          <Link className="btn btn-dark" to="/contact">
            Start a conversation <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
function PageIntro({ eyebrow, title, desc }) {
  return (
    <section className="page-intro">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {desc && <p>{desc}</p>}
        </Reveal>
      </div>
    </section>
  );
}
function About() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT / ANNA ROSSA"
        title={
          <>
            An international outlook.
            <br />
            <em>A people-first mindset.</em>
          </>
        }
        desc="Entrepreneur. Strategic thinker. Lifelong learner."
      />
      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <Portrait className="about-portrait" />
          </Reveal>
          <Reveal>
            <p className="eyebrow">MY STORY</p>
            <h2>
              Driven by curiosity.
              <br />
              <span className="muted">Grounded in purpose.</span>
            </h2>
            <p className="large-copy">
              I believe successful businesses connect commercial opportunity
              with lasting human value.
            </p>
            <p>
              My career began in international aviation, where team leadership,
              operational excellence and understanding people were essential.
              That foundation now informs a diverse group of entrepreneurial
              ventures across Qatar, the UAE, Poland and Sri Lanka.
            </p>
            <p>
              From youth development through Rebel Angels to personalised
              hydration through Water House, I am energised by creating concepts
              that improve experiences, build relationships and open new paths
              for growth.
            </p>
            <Link className="inline-action" to="/leadership">
              Explore my experience <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading eyebrow="MY VALUES" title="What guides my work" />
          <div className="values-grid">
            {[
              [
                "01",
                "People before processes",
                "Build trust, invest in teams and create meaningful experiences.",
              ],
              [
                "02",
                "Progress through partnership",
                "See collaboration as a long-term investment in mutual success.",
              ],
              [
                "03",
                "Think across borders",
                "Bring diverse perspectives together to unlock new possibilities.",
              ],
            ].map(([n, t, d]) => (
              <Reveal key={n}>
                <div className="value">
                  <span>{n}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
function Ventures() {
  return (
    <>
      <PageIntro
        eyebrow="THE VENTURE PORTFOLIO"
        title={
          <>
            Businesses with
            <br />
            <em>distinct purpose.</em>
          </>
        }
        desc="Six ventures across sectors and geographies, driven by thoughtful leadership and strategic ambition."
      />
      <section className="section">
        <div className="container venture-grid all-ventures">
          {ventures.map((item) => (
            <Reveal key={item.id}>
              <VentureCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
function VentureDetail() {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const item = ventures.find((v) => v.id === id);
  if (!item)
    return (
      <section className="container section">
        <h1>Venture not found</h1>
        <Link to="/ventures">Back to ventures</Link>
      </section>
    );
  return (
    <>
      <section className="page-intro detail-intro">
        <div className="container">
          <Link className="back-link" to="/ventures">
            ← All ventures
          </Link>
          <p className="eyebrow">
            {item.category} / {item.region}
          </p>
          <h1>{item.name}</h1>
          <p>{item.role}</p>
        </div>
      </section>
      {stories.some((s) => s.id === item.id) && (
        <section className="detail-story-link">
          <div className="container">
            <span>THE STORY BEHIND {item.name.toUpperCase()}</span>
            <Link to={"/stories#" + item.id}>
              Discover what inspired it <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container detail-grid">
          <div className={"detail-visual venture-visual " + item.visual}>
            <span className="venture-initial">{item.initial}</span>
          </div>
          <div>
            <p className="eyebrow">ABOUT THE VENTURE</p>
            <h2>{item.summary}</h2>
            <p className="large-copy">{item.detail}</p>
            <div className="detail-facts">
              <div>
                <span>POSITION</span>
                <strong>{item.role}</strong>
              </div>
              <div>
                <span>REGION</span>
                <strong>{item.region}</strong>
              </div>
              <div>
                <span>TIMELINE</span>
                <strong>{item.years}</strong>
              </div>
            </div>
            <Link className="btn btn-dark" to="/contact">
              Discuss a partnership <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
function Leadership() {
  return (
    <>
      <PageIntro
        eyebrow="LEADERSHIP & EXPERIENCE"
        title={
          <>
            Experience that shapes
            <br />
            <em>what comes next.</em>
          </>
        }
        desc="A professional journey from aviation leadership to international entrepreneurship."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="01 / FOUNDER & LEADERSHIP ROLES"
            title="Entrepreneurial leadership"
          />
          <div className="timeline">
            {ventures.map((item) => (
              <Reveal key={item.id}>
                <div className="timeline-row">
                  <span>{item.years}</span>
                  <div>
                    <h3>{item.role}</h3>
                    <p>
                      {item.name} · {item.region}
                    </p>
                  </div>
                  <ArrowUpRight size={19} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading
            eyebrow="02 / PROFESSIONAL CAREER"
            title="Aviation leadership"
          />
          <div className="timeline">
            {career.map((item) => (
              <Reveal key={item.company}>
                <div className="timeline-row">
                  <span>{item.period}</span>
                  <div>
                    <h3>{item.role}</h3>
                    <p>
                      {item.company} · {item.place}
                    </p>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                  <ArrowUpRight size={19} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="03 / EDUCATION & CERTIFICATIONS"
            title="Continuous development"
          />
          <div className="education-grid">
            {education.map((e, i) => (
              <Reveal key={e.title}>
                <div className="education-card">
                  <span>
                    {String(i + 1).padStart(2, "0")} / {e.period}
                  </span>
                  <h3>{e.title}</h3>
                  <p>{e.subtitle}</p>
                  <p>{e.institution}</p>
                  {e.detail && <small>{e.detail}</small>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="CONNECT / COLLABORATE"
        title={
          <>
            Let's create
            <br />
            <em>new possibilities.</em>
          </>
        }
        desc="For business partnerships, strategic collaboration and meaningful conversations."
      />
      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <h2>Start a conversation.</h2>
            <p className="large-copy">
              I’m always open to discussing innovative ideas, cross-border
              opportunities and collaborations that create lasting value.
            </p>
            <div className="contact-location">
              <MapPin size={19} /> Doha, Qatar · International
            </div>
          </Reveal>
          <Reveal>
            <div className="contact-panel">
              <p className="eyebrow">GET IN TOUCH</p>
              <a
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
                href={profile.linkedin}
              >
                <span>
                  <Linkedin size={24} /> Connect on LinkedIn
                </span>
                <ArrowUpRight size={22} />
              </a>
              {profile.email && (
                <a className="contact-link" href={"mailto:" + profile.email}>
                  <span>
                    <Mail size={24} /> {profile.email}
                  </span>
                  <ArrowUpRight size={22} />
                </a>
              )}
              <a
                className="contact-link"
                href={CV_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <Download size={24} /> View / save executive CV
                </span>
                <ArrowUpRight size={22} />
              </a>
              <p className="contact-note">
                Direct email will appear once a verified address is added to
                src/data.js.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
function CV() {
  return (
    <div className="cv-page">
      <div className="cv-toolbar container">
        <Link to="/">← Back to website</Link>
        <button onClick={() => window.print()} className="btn btn-dark">
          <Printer size={17} /> Print / Save PDF
        </button>
      </div>
      <article className="cv-document">
        <div className="cv-heading">
          <p>EXECUTIVE CURRICULUM VITAE</p>
          <h1>
            ANNA ROSSA
            <br />
            ZALEWSKI
          </h1>
          <h2>
            MULTI-VENTURE FOUNDER · MANAGING DIRECTOR · BUSINESS STRATEGIST
          </h2>
          <p>Doha, Qatar · linkedin.com/in/anna-rossa-zalewski</p>
        </div>
        <div className="cv-section">
          <h3>EXECUTIVE PROFILE</h3>
          <p>
            Entrepreneur and business leader with ventures spanning hydration,
            youth sports, hospitality, real estate, international trade and
            specialist textiles. Experienced in venture creation, strategic
            partnerships, brand development and cross-border growth.
          </p>
        </div>
        <div className="cv-section">
          <h3>OWNED VENTURES & ENTREPRENEURIAL LEADERSHIP</h3>
          {ventures.map((v) => (
            <div className="cv-entry" key={v.id}>
              <div>
                <strong>{v.name}</strong>
                <span>
                  {v.years} · {v.region}
                </span>
              </div>
              <div>
                <b>{v.role}</b>
                <p>{v.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cv-section">
          <h3>PROFESSIONAL CAREER</h3>
          {career.map((c) => (
            <div className="cv-entry" key={c.company}>
              <div>
                <strong>{c.company}</strong>
                <span>{c.period}</span>
              </div>
              <div>
                <b>{c.role}</b>
                <p>{c.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cv-section">
          <h3>EDUCATION & CERTIFICATIONS</h3>
          {education.map((e) => (
            <div className="cv-entry" key={e.title}>
              <div>
                <strong>{e.institution || e.title}</strong>
                <span>{e.period}</span>
              </div>
              <div>
                <b>{e.title}</b>
                <p>
                  {e.subtitle} {e.detail || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="cv-section">
          <h3>CORE CAPABILITIES</h3>
          <p>{capabilities.join(" · ")}</p>
        </div>
        <div className="cv-section">
          <h3>PARTNERSHIP INTERESTS</h3>
          <p>
            Corporate sponsorships in youth sports and wellness; strategic
            collaborations with brands and investors; mentorship and
            cross-border entrepreneurship.
          </p>
        </div>
      </article>
    </div>
  );
}
export default function App() {
  const { pathname } = useLocation();
  const isCv = pathname === "/cv";
  return (
    <>
      <ScrollTop />
      {!isCv && <Header />}
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ventures" element={<Ventures />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/ventures/:id" element={<VentureDetail />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<CV />} />
          <Route
            path="*"
            element={
              <section className="container section">
                <h1>Page not found</h1>
                <Link to="/">Go home →</Link>
              </section>
            }
          />
        </Routes>
      </main>
      {!isCv && <Footer />}
    </>
  );
}
