import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Sun, Moon, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Sample projects data - easily customizable
  const projects = [
    {
      name: "Weather App",
      description: "Responsive weather application with real-time data and location search",
      githubLink: "https://github.com/yourusername/weather-app",
      liveLink: "https://your-weather-app.com",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      name: "Task Manager",
      description: "Interactive todo app with local storage and drag-and-drop functionality",
      githubLink: "https://github.com/yourusername/task-manager",
      liveLink: "https://your-task-manager.com",
      tags: ["React", "CSS", "JavaScript"]
    },
    {
      name: "Portfolio Website",
      description: "Personal portfolio showcasing projects with modern design and animations",
      githubLink: "https://github.com/yourusername/portfolio",
      liveLink: "https://your-portfolio.com",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      name: "Restaurant Landing Page",
      description: "Modern responsive landing page with smooth animations and mobile-first design",
      githubLink: "https://github.com/yourusername/restaurant-landing",
      liveLink: "https://your-restaurant-site.com",
      tags: ["HTML", "CSS", "React"]
    }
  ];

  const skills = [
    "HTML", "CSS", "JavaScript", "React", "Responsive Design", 
    "Git", "Bootstrap", "Sass", "ES6+", "DOM Manipulation"
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
    }

    .portfolio-container {
      min-height: 100vh;
      transition: all 0.3s ease;
    }

    .light-theme {
      background-color: #ffffff;
      color: #1a202c;
    }

    .dark-theme {
      background-color: #1a202c;
      color: #ffffff;
    }

    /* Navigation Styles */
    .navbar {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      transform: translateY(0);
    }

    .navbar.scrolled {
      transform: translateY(${scrollY > 100 ? '-2px' : '0'});
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .light-theme .navbar {
      background-color: rgba(255, 255, 255, 0.95);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .dark-theme .navbar {
      background-color: rgba(26, 32, 44, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-link {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      color: #667eea;
      transform: translateY(-2px);
    }

    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: all 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
      left: 0;
    }

    .theme-toggle, .mobile-menu-btn {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .light-theme .theme-toggle:hover, .light-theme .mobile-menu-btn:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .dark-theme .theme-toggle:hover, .dark-theme .mobile-menu-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .mobile-menu {
      display: none;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem 0;
    }

    .mobile-menu.open {
      display: flex;
    }

    .mobile-nav-link {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      text-align: left;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .light-theme .mobile-nav-link:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .dark-theme .mobile-nav-link:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }

    /* Sections */
    .section {
      padding: 4rem 2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Hero Section */
    .hero {
      padding-top: 12rem;
      padding-bottom: 6rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(ellipse at center, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
      z-index: -1;
    }

    .hero-content {
      transform: translateY(${scrollY * 0.3}px);
    }

    .hero h1 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: bold;
      margin-bottom: 1.5rem;
      animation: fadeInUp 1s ease-out;
    }

    .hero-name {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero p {
      font-size: clamp(1.1rem, 2vw, 1.5rem);
      margin-bottom: 2rem;
      opacity: 0.8;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      animation: fadeInUp 1s ease-out 0.2s both;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      animation: fadeInUp 1s ease-out 0.4s both;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
    }

    /* About Section */
    .about {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    }

    .dark-theme .about {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-text p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      opacity: 0.8;
    }

    .skills-container h3 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .skill-tag {
      padding: 0.5rem 1rem;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: default;
    }

    .light-theme .skill-tag {
      background-color: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    .dark-theme .skill-tag {
      background-color: rgba(102, 126, 234, 0.2);
      color: #a78bfa;
    }

    .skill-tag:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
    }

    /* Projects Section */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .project-card {
      padding: 2rem;
      border-radius: 16px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .light-theme .project-card {
      background: white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .dark-theme .project-card {
      background: #2d3748;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .project-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .project-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 25px 50px rgba(102, 126, 234, 0.15);
    }

    .project-card h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }

    .project-card p {
      opacity: 0.8;
      margin-bottom: 1.5rem;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .project-tag {
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .light-theme .project-tag {
      background-color: rgba(118, 75, 162, 0.1);
      color: #764ba2;
    }

    .dark-theme .project-tag {
      background-color: rgba(118, 75, 162, 0.2);
      color: #c084fc;
    }

    .project-links {
      display: flex;
      gap: 1.5rem;
    }

    .project-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: inherit;
      text-decoration: none;
      opacity: 0.7;
      transition: all 0.3s ease;
    }

    .project-link:hover {
      opacity: 1;
      color: #667eea;
      transform: translateX(5px);
    }

    /* Contact Section */
    .contact {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    }

    .dark-theme .contact {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    }

    .contact-content {
      text-align: center;
    }

    .contact p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.8;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: inherit;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      color: #667eea;
      transform: translateY(-3px);
    }

    /* Footer */
    .footer {
      padding: 2rem;
      text-align: center;
      opacity: 0.6;
    }

    .light-theme .footer {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .dark-theme .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Section Headings */
    .section-heading {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: bold;
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
    }

    .section-heading::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-on-scroll {
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.8s ease;
    }

    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    /* Staggered animation for grid items */
    .project-card.animate-on-scroll:nth-child(1) { transition-delay: 0.1s; }
    .project-card.animate-on-scroll:nth-child(2) { transition-delay: 0.2s; }
    .project-card.animate-on-scroll:nth-child(3) { transition-delay: 0.3s; }
    .project-card.animate-on-scroll:nth-child(4) { transition-delay: 0.4s; }

    /* Responsive */
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }

      .desktop-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .mobile-menu-btn {
        display: block;
      }

      .about-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }

      .social-links {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .section {
        padding: 3rem 1rem;
      }
    }

    @media (min-width: 769px) {
      .mobile-menu-btn {
        display: none;
      }
    }
  `;

  return (
    <div className={`portfolio-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <style>{styles}</style>
      
      {/* Navigation */}
      <nav className={`navbar ${scrollY > 100 ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">Osaroekaa</div>
          
          <div className="nav-links">
            <button onClick={() => scrollToSection('home')} className="nav-link">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link">
              About
            </button>
            <button onClick={() => scrollToSection('projects')} className="nav-link">
              Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </button>
            <button onClick={toggleDarkMode} className="theme-toggle">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="desktop-controls">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('home')} className="mobile-nav-link">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="mobile-nav-link">
            About
          </button>
          <button onClick={() => scrollToSection('projects')} className="mobile-nav-link">
            Projects
          </button>
          <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero section">
        <div className="container">
          <div className="hero-content">
            <h1>
              Hi, I'm <span className="hero-name">Osaroekaa Sampson</span>
            </h1>
            <p>
              Frontend Developer with 1.5 years of experience creating responsive, 
              user-friendly web applications with modern technologies and best practices.
            </p>
            <button 
              onClick={() => scrollToSection('projects')}
              className="cta-button"
            >
              View My Work
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section animate-on-scroll">
        <div className="container">
          <h2 className="section-heading">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a passionate frontend developer with 1.5 years of experience building responsive web applications. 
                I specialize in creating clean, user-friendly interfaces using modern web technologies.
              </p>
              <p>
                I'm constantly learning and staying up-to-date with the latest frontend trends and best practices. 
                I love bringing designs to life and creating smooth, interactive user experiences.
              </p>
            </div>
            <div className="skills-container">
              <h3>Skills & Technologies</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-heading animate-on-scroll">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card animate-on-scroll">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Github size={18} />
                    Code
                  </a>
                  <a 
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          <div className="contact-content animate-on-scroll">
            <h2 className="section-heading">Get In Touch</h2>
            <p>
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            
            <div className="social-links">
              <a 
                href="mailto:osaroekaasampson.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Mail size={24} />
                Email
              </a>
              <a 
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin size={24} />
                LinkedIn
              </a>
              <a 
                href="https://twitter.com/@Osaroekaa001"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Twitter size={24} />
                Twitter
              </a>
            </div>

            <button 
              onClick={() => window.location.href = 'mailto:your.email@example.com'}
              className="cta-button"
            >
              Let's Talk
              <Mail size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Osaroekaa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;