const categories = {
  'user-frustration-mitigation': {
    auditRefs: [
      { id: 'total-blocking-time', weight: 1, group: 'metrics' },
      { id: 'cumulative-layout-shift', weight: 1, group: 'metrics' },
      // Mobile Friendliness:
      { id: 'uses-responsive-images', weight: 1, group: 'mobile-friendliness' },
      { id: 'viewport', weight: 1, group: 'mobile-friendliness' },
      //{ id: 'tap-targets', weight: 1, group: 'mobile-friendliness' },
      { id: 'first-contentful-paint', weight: 1, group: 'mobile-friendliness' },
      { id: 'largest-contentful-paint', weight: 1, group: 'mobile-friendliness' },
      { id: 'offscreen-images', weight: 1, group: 'mobile-friendliness' },
      { id: 'uses-optimized-images', weight: 1, group: 'mobile-friendliness' },
      { id: 'unused-css-rules', weight: 1, group: 'mobile-friendliness' },
      { id: 'unused-javascript', weight: 1, group: 'mobile-friendliness' },
      { id: 'meta-viewport', weight: 1, group: 'mobile-friendliness' },
      { id: 'font-size', weight: 1, group: 'mobile-friendliness' },
      //{ id: 'estimated-input-latency', weight: 1, group: 'mobile-friendliness' },
    ]
  }
}

export const ufmAuditRefs = categories['user-frustration-mitigation'].auditRefs.map(a => a.id);

export default categories;
