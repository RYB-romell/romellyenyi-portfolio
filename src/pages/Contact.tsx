import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useThemeColors } from '../hooks/useThemeColors';
import { socialLinks } from '../config/socialLinks';
import { useLanguage } from '../contexts/useLanguage';
import './Contact.css';

const contactReasons = [
  'Discuss a project',
  'Hire me for a role',
  'Request a collaboration',
  'Ask for technical help',
  'Invite me to speak or mentor',
  'Something else',
];

const serviceOptions = [
  'Full-stack web development',
  'Frontend development',
  'Backend / API development',
  'Cloud infrastructure',
  'DevOps & CI/CD',
  'Applied AI integration',
];

const Contact = () => {
  const themeColors = useThemeColors();
  const { language } = useLanguage();

  const translatedReasons = language === 'fr' ? [
    'Discuter d’un projet', 'Recruter pour un poste', 'Demander une collaboration',
    'Demander une aide technique', 'Invitation à parler ou mentorat', 'Autre demande',
  ] : contactReasons;

  const translatedServices = language === 'fr' ? [
    'Développement web full-stack', 'Développement frontend', 'Développement backend / API',
    'Infrastructure cloud', 'DevOps & CI/CD', 'Intégration d’IA appliquée',
  ] : serviceOptions;

  const [reason, setReason] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const details = String(form.get('details') ?? '').trim();

    if (!name || !email || !reason || selectedServices.length === 0 || !details) {
      setStatus(language === 'fr' ? 'Veuillez remplir tous les champs requis.' : 'Please complete all required fields.');
      return;
    }

    const subject = encodeURIComponent(`${reason} — ${name}`);
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Reason for contact: ${reason}`,
      `Services: ${selectedServices.join(', ')}`,
      '',
      'Project details:',
      details,
    ].join('\n'));

    const recipient = socialLinks.email || '';
    setStatus(language === 'fr' ? 'Ouverture de votre messagerie avec votre demande…' : 'Opening your email app with the completed enquiry…');
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <main
      aria-labelledby="contact-title"
      className="contact-page"
      style={{ backgroundColor: themeColors.background.primary }}
    >
      <div className="contact-shell">
        <header className="contact-heading">
          <div className="contact-eyebrow">Start a conversation</div>
          <h1 id="contact-title">Let's build something valuable.</h1>
          <p>
            Share what you are working on, what support you need, and where you want to take it.
            I will review the details and get back to you as soon as possible.
          </p>
        </header>

        <div className="contact-layout">
          <section className="contact-form-card" aria-label="Contact form">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="contact-name">Name <span className="required-mark">*</span></label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">Email <span className="required-mark">*</span></label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-phone">Phone <span className="required-mark">Optional</span></label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Include country code" />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-reason">Why are you contacting me? <span className="required-mark">*</span></label>
                  <select
                    id="contact-reason"
                    name="reason"
                    required
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                  >
                    <option value="" disabled>Select a reason</option>
                    {translatedReasons.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <fieldset className="services-fieldset form-field-full">
                  <legend>Which services do you need? <span className="required-mark">*</span></legend>
                  <div className="service-options">
                    {translatedServices.map((service) => (
                      <label className="service-option" key={service}>
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          checked={selectedServices.includes(service)}
                          onChange={() => toggleService(service)}
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="form-field form-field-full">
                  <label htmlFor="contact-details">Tell me about the opportunity <span className="required-mark">*</span></label>
                  <textarea
                    id="contact-details"
                    name="details"
                    required
                    maxLength={2500}
                    placeholder="Describe the project, role, timeline, location, budget range, or any useful context…"
                  />
                  <span className="field-hint">Please do not include passwords or confidential credentials.</span>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Send enquiry
                  <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <p className="form-status" role="status" aria-live="polite">
                  {status || (language === 'fr'
                    ? 'La demande sera préparée dans votre messagerie, puis envoyée à mon adresse professionnelle.'
                    : 'Your enquiry will open in your email app and send to my professional email address.')}
                </p>
              </div>
            </form>
          </section>

          <aside className="contact-aside" aria-label="Contact options">
            <h2>Prefer to reach out directly?</h2>
            <p>Choose the channel that works best for you.</p>

            {socialLinks.email && (
              <a className="aside-link" href={`mailto:${socialLinks.email}`}>
                <span>Email</span>
                <Mail size={16} aria-hidden="true" />
              </a>
            )}

            {socialLinks.linkedin && (
              <a className="aside-link" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <span>LinkedIn</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}

            {socialLinks.github && (
              <a className="aside-link" href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <span>GitHub</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}

            <a className="aside-link" href="/#projects">
              <span>View selected work</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>

            <div className="aside-note">
              <p>Typical enquiries include:</p>
              <p>Product development · Cloud infrastructure · DevOps automation · AI-enabled features · Engineering roles</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Contact;