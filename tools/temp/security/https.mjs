const auditRefs = [
  { id: 'is-on-https', weight: 1, group: 'security-and-trust' },
  { id: 'uses-http2', weight: 1, group: 'security-and-trust' },
  { id: 'redirects-http', weight: 1, group: 'security-and-trust' },
  //{ id: 'external-anchors-use-noopener', weight: 1, group: 'security-and-trust' },
  //{ id: 'uses-secure-cookies', weight: 1, group: 'security-and-trust' },
  //{ id: 'no-mixed-content', weight: 1, group: 'security-and-trust' },
];

export default auditRefs;
