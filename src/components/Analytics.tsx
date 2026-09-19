import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

/**
 * Vercel Web Analytics (traffic + referral sources) and Speed Insights
 * (real-visitor Core Web Vitals). Both are injected client-side and only report
 * when the project has the corresponding integration enabled in the dashboard.
 *
 * Custom events for the outcomes Praxis tracks (completed gifts, event
 * registrations, newsletter signups, training inquiries) are sent through
 * `track()` from '@vercel/analytics' - see src/lib/analytics.ts.
 */
export default function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
