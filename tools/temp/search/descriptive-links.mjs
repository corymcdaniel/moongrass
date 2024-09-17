const auditRefs = [
  { id: 'link-text', weight: 1, group: 'search-visibility-and-navigation' },  // Ensure links are descriptive
  { id: 'crawlable-anchors', weight: 1, group: 'search-visibility-and-navigation' },  // Ensure links are crawlable
  //{ id: 'external-anchors-use-noopener', weight: 1, group: 'search-visibility-and-navigation' },  // Security best practice for external links
  { id: 'link-name', weight: 1, group: 'search-visibility-and-navigation' },  // Ensure links have accessible, discernible names
]

export default auditRefs;
