import { useEffect, useMemo, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';
import { useDarkMode } from '../../contexts/useDarkMode';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useLanguage } from '../../contexts/useLanguage';
import './Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const sectionLinks = useMemo(() => language === 'fr'
    ? [
        { id: 'about', label: 'À propos' },
        { id: 'skills', label: 'Compétences' },
        { id: 'projects', label: 'Projets' },
        { id: 'experience', label: 'Expérience' },
      ]
    : [
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
      ], [language]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      if (location.pathname !== '/') {
        return;
      }

      const candidates = sectionLinks
        .map((link) => {
          const element = document.getElementById(link.id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { id: link.id, distance: Math.abs(rect.top - 120) };
        })
        .filter((item): item is { id: string; distance: number } => item !== null);

      if (candidates.length > 0) {
        const closest = candidates.reduce((current, candidate) =>
          candidate.distance < current.distance ? candidate : current
        );
        setActiveSection(closest.id);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 960) setIsMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname, sectionLinks]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goHome = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const goToContact = () => {
    setIsMobileMenuOpen(false);
    navigate('/contact');
  };

  const pageIndicator = location.pathname === '/contact'
    ? (language === 'fr' ? 'Contact' : 'Contact')
    : location.pathname === '/blog'
      ? 'Blog'
      : activeSection === 'experience'
        ? (language === 'fr' ? 'Expérience' : 'Experience')
        : activeSection === 'projects'
          ? (language === 'fr' ? 'Projets' : 'Projects')
          : activeSection === 'skills'
            ? (language === 'fr' ? 'Compétences' : 'Skills')
            : (language === 'fr' ? 'Accueil' : 'Home');

  const navSurface = isDarkMode ? 'rgba(9, 9, 11, 0.92)' : 'rgba(255, 255, 255, 0.92)';

  return (
    <header
      className={`global-navigation ${isScrolled ? 'scrolled' : ''}`}
      style={{
        backgroundColor: navSurface,
        borderBottomColor: themeColors.border,
      }}
    >
      <nav className="navigation-shell" aria-label="Primary navigation">
        <button
          type="button"
          className="brand-control"
          onClick={goHome}
          aria-label="Romellyenyi — go to homepage"
        >
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <span className="brand-name">Romellyenyi</span>
            <span className="page-indicator">{pageIndicator}</span>
          </span>
        </button>

        <div className="desktop-navigation" aria-label="Page sections">
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`navigation-link ${activeSection === link.id && location.pathname === '/' ? 'active' : ''}`}
              onClick={() => scrollToSection(link.id)}
              aria-current={activeSection === link.id && location.pathname === '/' ? 'location' : undefined}
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            className={`navigation-link ${location.pathname === '/blog' ? 'active' : ''}`}
            onClick={() => navigate('/blog')}
            aria-current={location.pathname === '/blog' ? 'page' : undefined}
          >
            Blog
          </button>

          <button
            type="button"
            className={`navigation-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={goToContact}
            aria-current={location.pathname === '/contact' ? 'page' : undefined}
          >
            Contact
          </button>
        </div>

        <div className="navigation-controls">
          <div className="language-control" aria-label="Language selector">
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
              aria-label="Display content in English"
              aria-pressed={language === 'en'}
            >EN</button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              className={language === 'fr' ? 'active' : ''}
              onClick={() => setLanguage('fr')}
              aria-label="Afficher le contenu en français"
              aria-pressed={language === 'fr'}
            >FR</button>
          </div>

          <DarkModeToggle checked={isDarkMode} onChange={toggleDarkMode} />

          <button type="button" className="navigation-cta" onClick={goToContact}>
            {language === 'fr' ? 'Échangeons' : "Let's talk"}
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-panel"
        >
          {isMobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-navigation-panel"
        className={`mobile-navigation-panel ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
        style={{
          backgroundColor: isDarkMode ? themeColors.colors.dark[950] : themeColors.colors.white,
          borderBottomColor: themeColors.border,
        }}
      >
        <div className="mobile-navigation-links">
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={activeSection === link.id && location.pathname === '/' ? 'active' : ''}
              onClick={() => scrollToSection(link.id)}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <span>{link.label}</span>
              <span className="mobile-link-arrow" aria-hidden="true">↗</span>
            </button>
          ))}

          <button
            type="button"
            className={location.pathname === '/blog' ? 'active' : ''}
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/blog');
            }}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            <span>Blog</span>
            <span className="mobile-link-arrow" aria-hidden="true">↗</span>
          </button>

          <button
            type="button"
            className={location.pathname === '/contact' ? 'active' : ''}
            onClick={goToContact}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            <span>Contact</span>
            <span className="mobile-link-arrow" aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="mobile-navigation-footer">
          <div className="language-control" aria-label="Language selector">
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
              aria-label="Display content in English"
              aria-pressed={language === 'en'}
            >EN</button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              className={language === 'fr' ? 'active' : ''}
              onClick={() => setLanguage('fr')}
              aria-label="Afficher le contenu en français"
              aria-pressed={language === 'fr'}
            >FR</button>
          </div>
          <DarkModeToggle checked={isDarkMode} onChange={toggleDarkMode} />
          <button
            type="button"
            className="navigation-cta"
            onClick={goToContact}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            {language === 'fr' ? 'Échangeons' : "Let's talk"}
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;