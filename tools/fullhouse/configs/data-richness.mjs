import indexable from "./data-richness/indexable.mjs";
import namedElement from "./data-richness/named-element.mjs";
import watchedElement from "./data-richness/watched-element.mjs";
import dataLayer from "./data-richness/data-layer.mjs";

const dataRichnessAuditRefs = [
  ...indexable,
  ...namedElement,
  ...watchedElement,
  ...dataLayer
];

export const dataRichnessRefList = dataRichnessAuditRefs.map(a => a.id);

export default dataRichnessAuditRefs;
