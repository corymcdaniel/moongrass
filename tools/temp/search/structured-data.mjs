const auditRefs = [
  { id: 'hreflang', weight: 1, group: 'data-richness' },  // Hreflang for language and regional targeting
  { id: 'canonical', weight: 1, group: 'data-richness' },  // Canonical URL
  { id: 'robots-txt', weight: 1, group: 'data-richness' },  // Robots meta tags
  //{ id: 'valid-html', weight: 1, group: 'data-richness' },  // Valid HTML structure (custom or existing audit)
  { id: 'render-blocking-resources', weight: 1, group: 'data-richness' },  // Minimize render-blocking resources
  //{ id: 'no-mixed-content', weight: 1, group: 'data-richness' },  // Avoid mixed content
]

export default auditRefs;
