import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeColors } from '../hooks/useThemeColors';
import { useLanguage } from '../contexts/useLanguage';
import './Blog.css';

const Blog = () => {
  const themeColors = useThemeColors();
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const copy = language === 'fr'
    ? {
        eyebrow: 'Journal technique',
        title: 'Le blog arrive bientôt.',
        description: 'Je prépare un espace pour partager des projets, des notes techniques, des pratiques DevOps, du cloud computing et de l’IA appliquée.',
        status: 'Fonctionnalité en cours de développement',
        back: 'Retour à l’accueil',
      }
    : {
        eyebrow: 'Technical journal',
        title: 'The blog is coming soon.',
        description: 'I am preparing a space to share engineering projects, technical notes, DevOps practices, cloud computing insights and applied AI work.',
        status: 'Feature in development',
        back: 'Back to home',
      };

  return (
    <main className="blog-page" style={{ backgroundColor: themeColors.background.primary }}>
      <section className="blog-coming-soon" aria-labelledby="blog-title">
        <div className="blog-status"><span aria-hidden="true" />{copy.status}</div>
        <p className="blog-eyebrow">{copy.eyebrow}</p>
        <h1 id="blog-title">{copy.title}</h1>
        <p className="blog-description">{copy.description}</p>
        <button type="button" className="blog-back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={17} aria-hidden="true" />
          {copy.back}
        </button>
      </section>
    </main>
  );
};

export default Blog;
