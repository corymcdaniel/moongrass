const categories = {
  'engagement-and-retention': {
    auditRefs: [
      { id: 'first-contentful-paint', weight: 1, groups: ['performance','engagement-and-retention'] },
      { id: 'speed-index', weight: 1, group: 'engagement-and-retention' },
      { id: 'largest-contentful-paint', weight: 1, group: 'engagement-and-retention' },
    ]
  },
}

export const enrAuditRefs = categories['engagement-and-retention'].auditRefs.map(a => a.id);

export default categories;
