import { track } from '@vercel/analytics';

/**
 * Outcome events for Praxis.
 *
 * Clicks and completions are deliberately separate names. A button click is not
 * a donation: completed gifts are confirmed against Givebutter records, event
 * registrations against Action Network records. `*_clicked` events are measured
 * here; `*_completed` events are only sent when the source of truth says so
 * (e.g. a return URL carrying the provider's confirmation).
 */
export type OutcomeEvent =
  | 'donate_tier_selected'
  | 'donate_checkout_opened'
  | 'donate_gift_completed'
  | 'event_registration_opened'
  | 'event_registration_completed'
  | 'newsletter_signup_clicked'
  | 'newsletter_signup_completed'
  | 'training_inquiry_clicked'
  | 'contact_form_submitted';

export function trackOutcome(event: OutcomeEvent, props?: Record<string, string | number | boolean>) {
  try {
    track(event, props);
  } catch {
    // Analytics must never break a donation or a form submission.
  }
}
