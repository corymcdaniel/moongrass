import groups from './configs/groups.mjs';
import performanceCategories, {performanceAuditRefs} from './configs/performance.mjs'
import securityAudits, {securityAuditRefList} from "./configs/security.mjs";
import searchAuditRefs, {searchAuditRefList} from "./configs/search.mjs";
import dataRichnessAuditRefs, {dataRichnessRefList} from "./configs/data-richness.mjs";
import {
  AriaAttributeGatherer,
  AriaRoleAttributeGatherer,
  DataAttributeGatherer,
  ElementAttributesGatherer
} from "./gather/element-attributes.mjs";
import AriaAttributesAudit from "./audits/aria-attributes.mjs";
import FirstContentfulPaint from "lighthouse/core/audits/metrics/first-contentful-paint.js";
const auditList = [
  ...performanceAuditRefs,

  ...securityAuditRefList,

  ...searchAuditRefList,

  ...dataRichnessRefList
];

const config = {
  extends: 'lighthouse:default',
  onlyCategories: [
    'engagement-and-retention',
    'user-frustration-mitigation',
    'practices-and-efficiency',

    'best-practices',
    'security-and-trust',
    'search-visibility-and-nav',
    'data-richness',
  ],

  // DOES NOT WORK:
  // passes: [{
  //   passName: 'defaultPass',
  //   gatherers: [
  //     //'./tools/fullhouse/gather/element-attributes.mjs',
  //     ElementAttributesGatherer,
  //     AriaAttributeGatherer,
  //     AriaRoleAttributeGatherer,
  //     DataAttributeGatherer
  //   ],
  // }],

  // Required for custom audits/gathers
  // artifacts: [
  //   {id: 'ElementAttributes', gatherer: ElementAttributesGatherer},
  //   {id: 'AriaAttributes', gatherer: AriaAttributeGatherer},
  //   {id: 'AriaRoleAttributes', gatherer: AriaRoleAttributeGatherer},
  //   {id: 'DataAttributes', gatherer: DataAttributeGatherer},
  // ],

  audits: [
    ...auditList,
    //{id: 'fs-aria-attributes', path: './tools/fullhouse/audits/aria-attributes.mjs'}
  ],

  //onlyAudits: [...new Set(auditList), {path: "../audits/aria-attributes.mjs"}],
  onlyAudits: [
    ...new Set(auditList),
    //'fs-aria-attributes'
  ],
  //onlyAudits: ['fs-aria-attributes'],
  groups: groups,
  categories: {
    // // 50% Performance
    ...performanceCategories,
    //
    // // 15% Security and Trust
    'security-and-trust': {
      auditRefs: [
        ...securityAudits,
      ],
    },
    //
    // // 15% SEO (Search Visibility and Navigation)
    'search-visibility-and-nav': {
      auditRefs: [
        ...searchAuditRefs
      ],
    },

    // 20% Data Richness (Custom Category)
    'data-richness': { //'data-richness'
      title: 'Data Richness',
      description: 'Audits for data richness and element indexability',
      auditRefs: [
        ...dataRichnessAuditRefs,
        //{ id: 'first-contentful-paint', weight: 1, groups: ['performance','engagement-and-retention'] },
        //{id: 'fs-aria-attributes', weight: 1, group: 'data-richness'}
      ],
    }
  },
};
//console.log(JSON.stringify(config));

export default config;

/*
* categories: {
    // 50% Performance
    performance: {
      auditRefs: [
        // 15% of Performance (5% each of total score)
        { id: 'first-contentful-paint', weight: 5, group: 'metrics' },
        { id: 'speed-index', weight: 5, group: 'metrics' },
        { id: 'largest-contentful-paint', weight: 5, group: 'metrics' },
        // 25% of Performance (8.33% each of total score)
        { id: 'total-blocking-time', weight: 8.33, group: 'metrics' },
        { id: 'cumulative-layout-shift', weight: 8.33, group: 'metrics' },
        { id: 'dom-size', weight: 8.33, group: 'metrics' }, // Placeholder for mobile-friendliness
        // 10% of Performance (2.5% each of total score)
        { id: 'unminified-javascript', weight: 2.5, group: 'metrics' }, // Placeholder for modern JS
        { id: 'efficient-animated-content', weight: 2.5, group: 'metrics' }, // Efficient resources
        { id: 'errors-in-console', weight: 2.5, group: 'metrics' }, // Console data capture
        { id: 'total-byte-weight', weight: 2.5, group: 'metrics' }, // Network data capture
      ],
    },

    // 15% Security and Trust
    'best-practices': {
      auditRefs: [
        { id: 'is-on-https', weight: 5, group: 'best-practices' }, // HTTPS security
        { id: 'uses-http2', weight: 5, group: 'best-practices' }, // No security vulnerabilities (example)
        { id: 'form-field-multiple-labels', weight: 5, group: 'best-practices' }, // Placeholder for form privacy
      ],
    },

    // 15% SEO (Search Visibility and Navigation)
    seo: {
      auditRefs: [
        { id: 'meta-description', weight: 3.75, group: 'seo' }, // Meta tags
        { id: 'document-title', weight: 3.75, group: 'seo' }, // Page titles
        { id: 'link-text', weight: 3.75, group: 'seo' }, // Descriptive links
        { id: 'is-crawlable', weight: 3.75, group: 'seo' }, // Placeholder for structured data
      ],
    },

    // 20% Data Richness (Custom Category)
    accessibility: { //'data-richness'
      title: 'Data Richness',
      description: 'Audits for data richness and element indexability',
      auditRefs: [
        { id: 'crawlable-anchors', weight: 5, group: 'accessibility' }, // Indexed elements
        { id: 'image-alt', weight: 5, group: 'accessibility' }, // Named element (Image Alt)
        { id: 'uses-passive-event-listeners', weight: 5, group: 'accessibility' }, // Passive event listeners
        { id: 'doctype', weight: 5, group: 'accessibility' }, // Placeholder for data layers
      ],
    },
  },
* */
