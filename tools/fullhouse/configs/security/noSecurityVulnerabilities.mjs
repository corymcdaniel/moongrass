const auditRefs = [
  //{ id: 'no-vulnerable-libraries', weight: 1, group: 'security-and-trust' },
  { id: 'is-on-https', weight: 1, group: 'security-and-trust' },
  //{ id: 'no-mixed-content', weight: 1, group: 'security-and-trust' },
  //{ id: 'uses-secure-cookies', weight: 1, group: 'security-and-trust' },
  //{ id: 'xss-protection', weight: 1, group: 'security-and-trust' },
  //{ id: 'external-anchors-use-noopener', weight: 1, group: 'security-and-trust' },
  { id: 'csp-xss', weight: 1, group: 'security-and-trust' },
];

export default auditRefs;
