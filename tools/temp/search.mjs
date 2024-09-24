import metaTagAudits from './search/meta-tags.mjs'
import descriptiveLinks from "./search/descriptive-links.mjs";
import structuredData from "./search/structured-data.mjs";

export const searchAuditRefs = [
  ...metaTagAudits,
  // Page Title
  { id: 'document-title', weight: 1, group: 'search-visibility-and-navigation' },
  //...descriptiveLinks,
  //...structuredData
]

export const searchAuditRefList = searchAuditRefs.map(a => a.id)

export default searchAuditRefs;
