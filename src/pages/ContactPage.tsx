import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageQuote from '../components/PageQuote';
import SEOHead from '../components/SEOHead';
import { submitForm } from '../lib/api';

const contactReasons = [
  'Media',
  'Funder',
  'Coalition Partner',
  'Volunteer',
  'Training Request',
  'Speaking Request',
  'Family/Community Concern',
  'General Inquiry',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    reason: '',
    message: '',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await submitForm({
      form: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      reason: formData.reason,
      message: formData.message,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#050A0F' }}>
      <SEOHead
        title="Contact Us"
        description="Contact Praxis Initiative for media inquiries, coalition partnerships, training requests, speaking engagements, or general information about our work."
        path="/contact"
      />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Praxis"
        subtitle="Work with Praxis on policy, training, media, or coalition strategy. We welcome inquiries from advocates, lawmakers, funders, media, and community members."
        backgroundImage="/images/coalition-meeting.jpg"
        gradientAccent="#008C8C"
      />
      <PageQuote
        quote="Our greatest glory is not in never falling, but in rising every time we fall."
        attribution="Confucius"
        accentColor="#008C8C"
      />

      <section style={{ paddingBottom: '120px' }}>
        <div className="content-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px' }} className="contact-grid">
            {/* Contact Info */}
            <div>
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <MapPin size={20} style={{ color: '#008C8C' }} />
                  <h2 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#ffffff' }}>Location</h2>
                </div>
                <p className="font-sans-body" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', paddingLeft: '32px' }}>
                  Phoenix, Arizona
                </p>
              </div>

              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Mail size={20} style={{ color: '#008C8C' }} />
                  <h2 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#ffffff' }}>Email</h2>
                </div>
                <a href="mailto:info@praxisinitiative.org" style={{ fontSize: '15px', color: '#008C8C', textDecoration: 'none', paddingLeft: '32px' }}>
                  info@praxisinitiative.org
                </a>
              </div>

              <div style={{ padding: '32px', background: 'rgba(0,140,140,0.06)', borderRadius: '8px', borderLeft: '3px solid #008C8C' }}>
                <h2 className="font-serif-display" style={{ fontSize: '18px', fontWeight: 400, color: '#ffffff', marginBottom: '12px' }}>Response Time</h2>
                <p className="font-sans-body" style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
                  We aim to respond to all inquiries within 2-3 business days. For urgent media requests, please note "URGENT" in your message.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                  <CheckCircle size={48} style={{ color: '#008C8C', marginBottom: '24px' }} />
                  <h2 className="font-serif-display" style={{ fontSize: '24px', fontWeight: 300, color: '#ffffff', marginBottom: '12px' }}>Thank You</h2>
                  <p className="font-sans-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>
                    Your message has been received. We will respond within 2-3 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {error && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(224,85,85,0.12)', border: '1px solid rgba(224,85,85,0.3)', borderRadius: '6px' }}>
                      <AlertCircle size={16} style={{ color: '#E05555', flexShrink: 0 }} />
                      <p className="font-sans-body" style={{ fontSize: '13px', color: '#E05555', margin: 0 }}>{error}</p>
                    </div>
                  )}
                  <div>
                    <label className="font-sans-body" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="font-sans-body" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#FFFFFF', fontSize: '15px', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label className="font-sans-body" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="font-sans-body" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#FFFFFF', fontSize: '15px', outline: 'none' }} />
                    </div>
                    <div>
                      <label className="font-sans-body" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="font-sans-body" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#FFFFFF', fontSize: '15px', outline: 'none' }} />
                    </div>
                  </div>

                  <div>
                    <label className="font-sans-body" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Organization</label>
                    <input type="text" name="organization" value={formData.organization} onChange={handleChange} className="font-sans-body" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#FFFFFF', fontSize: '15px', outline: 'none' }} />
                  </div>

                  <div>
                    <label className="font-sans-body" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Reason for Contact *</label>
                    <select name="reason" value={formData.reason} onChange={handleChange} required className="font-sans-body" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#FFFFFF', fontSize: '15px',  appearance: 'none' }}>
                      <option value="">Select a reason</option>
                      {contactReasons.map((reason) => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-sans-body" style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="font-sans-body" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#FFFFFF', fontSize: '15px',  resize: 'vertical' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required style={{ marginTop: '3px' }} />
                    <label className="font-sans-body" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)' }}>
                      I consent to Praxis Initiative storing and processing my information to respond to this inquiry. *
                    </label>
                  </div>

                  <button type="submit" className="btn-praxis-solid" style={{ display: 'inline-flex', alignSelf: 'flex-start', marginTop: '8px' }} disabled={submitting}>
                    {submitting ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</> : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
