import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import './Portfilio.css';

const projects = [
  {
    name: 'CarMarket',
    category: 'Marketplace',
    number: '01',
    description:
      'A multi-city car marketplace that helps buyers discover dealer inventory across Calabar, Port Harcourt, and Lagos. Dealers can publish a listing with a short, focused form.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    githubLink: 'https://github.com/Osaroekaa/CarMarket',
    liveLink: 'https://car-market-murex.vercel.app/',
  },
  {
    name: 'Swift Delivery',
    category: 'Delivery tracking',
    number: '02',
    description:
      'A delivery experience that lets customers follow an order on a live map from payment to doorstep, reducing the need to chase updates.',
    tags: ['React', 'Vite', 'Leaflet'],
    githubLink: 'https://github.com/Osaroekaa/SwiftDelivery',
    liveLink: 'https://luminous-licorice-0f04d1.netlify.app/',
  },
  {
    name: 'Market Square',
    category: 'E-commerce',
    number: '03',
    description:
      'A mobile-friendly storefront with product discovery and delivery information surfaced on product pages, helping shoppers make decisions before checkout.',
    tags: ['React', 'React Router', 'JavaScript'],
    githubLink: 'https://github.com/Osaroekaa/E-commerce-website',
    liveLink: 'https://marketsquarecloneio.vercel.app/',
  },
  {
    name: 'Dely Pastries',
    category: 'Business website',
    number: '04',
    description:
      'A bakery storefront that presents its products and kitchen, with direct WhatsApp and phone links to make placing an order straightforward.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    githubLink: 'https://github.com/Osaroekaa/delypasteries',
    liveLink: 'https://delypasteries.vercel.app/',
  },
];

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'React Router',
  'Tailwind CSS',
  'HTML',
  'CSS',
  'Sass',
  'Bootstrap',
  'Leaflet',
  'Git',
];

const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pendingSectionRef = useRef(null);

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.35;
      const atPageEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const pendingSection = pendingSectionRef.current;

      if (pendingSection) {
        const target = sections.find((section) => section.id === pendingSection);
        const targetBounds = target?.getBoundingClientRect();
        const targetReached =
          targetBounds &&
          targetBounds.top <= activationLine &&
          targetBounds.bottom > activationLine;
        const lastSection = sections[sections.length - 1];

        if (!target || targetReached || (atPageEnd && target === lastSection)) {
          pendingSectionRef.current = null;
          setActiveSection(pendingSection);
        }
        return;
      }

      if (atPageEnd) {
        setActiveSection(sections[sections.length - 1]?.id ?? 'home');
        return;
      }

      const sectionAtActivationLine = sections.reduce((active, section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          return section.id;
        }
        return active;
      }, 'home');

      setActiveSection(sectionAtActivationLine);
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    if (window.scrollY > 0) updateActiveSection();

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);
  const handleNavigationClick = (sectionId) => {
    pendingSectionRef.current = sectionId === activeSection ? null : sectionId;
    setActiveSection(sectionId);
    closeMenu();
  };

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label="Osaroekaa Sampson, home">
            <span className="wordmark-mark">&lt;/&gt;</span>
            <span>osaroekaa</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav
            id="primary-navigation"
            className={`primary-navigation${mobileMenuOpen ? ' is-open' : ''}`}
            aria-label="Main navigation"
          >
            {navigation.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
                aria-current={activeSection === id ? 'location' : undefined}
                onClick={() => handleNavigationClick(id)}
              >
                {label}
              </a>
            ))}
            <a
              className="header-contact"
              href="#contact"
              onClick={() => handleNavigationClick('contact')}
            >
              Let&apos;s talk <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="availability-dot" />
              Frontend developer <span className="eyebrow-divider">/</span> Calabar, Nigeria
            </p>
            <h1>
              I build useful
              <br />
              things for the <span>web.</span>
            </h1>
            <p className="hero-summary">
              I&apos;m Osaroekaa Sampson, a frontend developer working with React and
              Next.js to turn real-world problems into clear, dependable web
              experiences.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowDown size={16} />
              </a>
              <a
                className="button button-quiet"
                href="https://github.com/Osaroekaa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={17} /> GitHub <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="hero-meta" aria-label="Developer details">
              <span><strong>04</strong> selected projects</span>
              <span><strong>React</strong> &amp; Next.js</span>
              <span><MapPin size={14} /> Based in Nigeria</span>
            </div>
          </div>

          <div className="code-window" aria-label="Developer profile code example">
            <div className="code-window-bar">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="code-filename">developer.js</span>
              <span className="code-language">JavaScript</span>
            </div>
            <div className="code-content">
              <div className="code-line"><span className="line-number">1</span><span><span className="syntax-purple">const</span> developer = {'{'}</span></div>
              <div className="code-line"><span className="line-number">2</span><span className="code-indent"><span className="syntax-blue">name</span>: <span className="syntax-green">&apos;Osaroekaa Sampson&apos;</span>,</span></div>
              <div className="code-line"><span className="line-number">3</span><span className="code-indent"><span className="syntax-blue">role</span>: <span className="syntax-green">&apos;Frontend Developer&apos;</span>,</span></div>
              <div className="code-line"><span className="line-number">4</span><span className="code-indent"><span className="syntax-blue">location</span>: <span className="syntax-green">&apos;Calabar, Nigeria&apos;</span>,</span></div>
              <div className="code-line"><span className="line-number">5</span><span className="code-indent"><span className="syntax-blue">stack</span>: [</span></div>
              <div className="code-line"><span className="line-number">6</span><span className="code-indent code-indent-double"><span className="syntax-green">&apos;React&apos;</span>, <span className="syntax-green">&apos;Next.js&apos;</span>,</span></div>
              <div className="code-line"><span className="line-number">7</span><span className="code-indent code-indent-double"><span className="syntax-green">&apos;JavaScript&apos;</span>, <span className="syntax-green">&apos;TypeScript&apos;</span></span></div>
              <div className="code-line"><span className="line-number">8</span><span className="code-indent">],</span></div>
              <div className="code-line"><span className="line-number">9</span><span><span className="syntax-purple">function</span> <span className="syntax-yellow">build</span>(problem) {'{'}</span></div>
              <div className="code-line"><span className="line-number">10</span><span className="code-indent"><span className="syntax-purple">return</span> usefulExperiences(problem);</span></div>
              <div className="code-line"><span className="line-number">11</span><span>{'}'}</span></div>
              <div className="code-line"><span className="line-number">12</span><span>{'}'};</span></div>
            </div>
            <div className="code-window-footer">
              <span><span className="availability-dot" /> Available for opportunities</span>
              <span>UTF-8</span>
            </div>
          </div>
        </section>

        <section className="work-section section-shell" id="projects">
          <div className="section-heading">
            <div>
              <p className="eyebrow section-kicker">A few things I&apos;ve built</p>
              <h2>Selected work<span>.</span></h2>
            </div>
            <a
              className="text-link"
              href="https://github.com/Osaroekaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              More on GitHub <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.name}
                aria-label={`${project.name} project`}
              >
                <div className="project-topline">
                  <span className="project-number">{project.number} / 04</span>
                  <span className="project-category">{project.category}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags" aria-label={`${project.name} technologies`}>
                  {project.tags.map((tag) => (
                    <span className="tech-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github size={16} /> Source code <ArrowUpRight size={14} />
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    Live site <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section section-shell" id="about">
          <div className="about-copy">
            <p className="eyebrow section-kicker">A little about me</p>
            <h2>Thoughtful code.<br /><span>Useful outcomes.</span></h2>
            <p>
              I enjoy taking a problem from its first rough idea through to a
              working interface. I focus on responsive, accessible experiences,
              readable code, and getting the small details right across
              marketplaces, e-commerce, and service websites.
            </p>
            <a
              className="button button-outline"
              href={`${process.env.PUBLIC_URL}/Osaroekaa-Sampson-CV.docx`}
              download="Osaroekaa_Sampson_CV.docx"
            >
              Download my CV <ArrowDown size={16} />
            </a>
          </div>
          <div className="skills-panel">
            <div className="skills-panel-heading">
              <span className="terminal-prompt">&gt;_</span>
              <div>
                <p className="eyebrow">Toolbox</p>
                <h3>Technologies I work with</h3>
              </div>
            </div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <span className="skill-tag" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-copy">
            <p className="eyebrow section-kicker">Have something in mind?</p>
            <h2>Let&apos;s build something <span>useful.</span></h2>
            <p>
              I&apos;m open to frontend roles, collaborations, and interesting
              projects. Send me a note and let&apos;s talk.
            </p>
          </div>
          <a className="button button-primary contact-button" href="mailto:osaroekaasampson@gmail.com">
            <Mail size={17} /> osaroekaasampson@gmail.com <ArrowUpRight size={16} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="wordmark" href="#home">
            <span className="wordmark-mark">&lt;/&gt;</span>
            <span>osaroekaa</span>
          </a>
          <p>Designed and built by Osaroekaa Sampson.</p>
          <a href="https://github.com/Osaroekaa" target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={14} />
          </a>
          <span>© 2026 Osaroekaa</span>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
