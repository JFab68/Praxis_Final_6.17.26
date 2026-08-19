// API utility for form submissions via Web3Forms
// Configure by setting VITE_WEB3FORMS_KEY in your Vercel environment variables

const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

interface FormPayload {
  form: string;
  [key: string]: string | boolean;
}

export async function submitForm(payload: FormPayload): Promise<{ success: boolean; message: string }> {
  if (!ACCESS_KEY) {
    console.log('[DEV] Form submission simulated (no access key):', payload);
    await new Promise((r) => setTimeout(r, 800));
    return { success: true, message: 'Form submitted (development mode — no email sent). Configure VITE_WEB3FORMS_KEY in .env for production.' };
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Praxis Initiative — ${payload.form === 'newsletter' ? 'Newsletter Signup' : 'Contact Form'}`,
        from_name: 'Praxis Initiative Website',
        ...payload,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Server responded with ${response.status}`);
    }

    return { success: true, message: 'Thank you! Your submission has been received.' };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API] Form submission failed:', msg);
    return { success: false, message: `Submission failed: ${msg}. Please try again or email us directly.` };
  }
}
