// API utility for form submissions
// Configure your endpoint by setting VITE_FORM_ENDPOINT in your .env file
// Supports: Formspree, Web3Forms, Netlify Forms, or any POST endpoint

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

interface FormPayload {
  form: string;
  [key: string]: string | boolean;
}

export async function submitForm(payload: FormPayload): Promise<{ success: boolean; message: string }> {
  // If no endpoint configured, simulate for local development
  if (!FORM_ENDPOINT) {
    console.log('[DEV] Form submission simulated:', payload);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    return { success: true, message: 'Form submitted (development mode — no email sent). Configure VITE_FORM_ENDPOINT in .env for production.' };
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
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
