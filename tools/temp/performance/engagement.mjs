const categories = {
  'engagement-and-retention': {
    auditRefs: [
      { id: 'first-contentful-paint', weight: 1, group: 'metrics' },
      { id: 'speed-index', weight: 1, group: 'metrics' },
      { id: 'largest-contentful-paint', weight: 1, group: 'metrics' },
    ]
  },
}

export const enrAuditRefs = categories['engagement-and-retention'].auditRefs.map(a => a.id);

export default categories;
