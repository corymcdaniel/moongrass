const auditRefs = [
  { id: 'meta-description', weight: 1, group: 'search-visibility-and-navigation' },  // Meta description
  { id: 'document-title', weight: 1, group: 'search-visibility-and-navigation' },  // Document title
  { id: 'meta-viewport', weight: 1, group: 'search-visibility-and-navigation' },  // Viewport meta tag
  //{ id: 'charset-declaration', weight: 1, group: 'search-visibility-and-navigation' },  // Charset declaration
  { id: 'robots-txt', weight: 1, group: 'search-visibility-and-navigation' },  // Robots meta tag
  { id: 'hreflang', weight: 1, group: 'search-visibility-and-navigation' },  // Hreflang attributes
  { id: 'canonical', weight: 1, group: 'search-visibility-and-navigation' },  // Canonical link
  { id: 'http-status-code', weight: 1, group: 'search-visibility-and-navigation' },  // Valid HTTP status
];

export default auditRefs;
