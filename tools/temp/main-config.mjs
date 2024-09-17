import groups from './groups.mjs';
import performanceCategories, {performanceAuditRefs} from './performance.mjs'
import securityAudits, {securityAuditRefList} from "./security.mjs";
const test = performanceCategories

const config = {
  extends: 'lighthouse:default', // Extends the default configuration
  onlyCategories: [
    'engagement-and-retention',
    'user-frustration-mitigation',
    'practices-and-efficiency',
    'performance',
    'best-practices',
    'seo',
    'accessibility'
  ],

  onlyAudits: [
    ...performanceAuditRefs,

    ...securityAuditRefList,

    'meta-description','document-title','link-text','is-crawlable',

    'crawlable-anchors','image-alt','uses-passive-event-listeners','doctype'

  ],

  groups: groups,
  categories: {
    // 50% Performance
    ...performanceCategories,
    // performance: {
    //   auditRefs: [
    //     // 15% of Performance (5% each of total score)
    //     { id: 'first-contentful-paint', weight: 1, group: 'metrics' },
    //     { id: 'speed-index', weight: 1, group: 'metrics' },
    //     { id: 'largest-contentful-paint', weight: 1, group: 'metrics' },
    //
    //     // 25% of Performance (8.33% each of total score)
    //     { id: 'total-blocking-time', weight: 1, group: 'metrics' },
    //     { id: 'cumulative-layout-shift', weight: 1, group: 'metrics' },
    //     // Mobile Friendliness:
    //     { id: 'uses-responsive-images', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'viewport', weight: 1, group: 'mobile-friendliness' },
    //     //{ id: 'tap-targets', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'first-contentful-paint', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'largest-contentful-paint', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'offscreen-images', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'uses-optimized-images', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'unused-css-rules', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'unused-javascript', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'meta-viewport', weight: 1, group: 'mobile-friendliness' },
    //     { id: 'font-size', weight: 1, group: 'mobile-friendliness' },
    //     //{ id: 'estimated-input-latency', weight: 1, group: 'mobile-friendliness' },
    //
    //
    //     // 10% of Performance (2.5% each of total score)
    //     { id: 'unminified-javascript', weight: 1, group: 'metrics' }, // Placeholder for modern JS
    //     { id: 'efficient-animated-content', weight: 1, group: 'metrics' }, // Efficient resources
    //     { id: 'errors-in-console', weight: 1, group: 'metrics' }, // Console data capture
    //     { id: 'total-byte-weight', weight: 1, group: 'metrics' }, // Network data capture
    //   ],
    // },

    // 15% Security and Trust
    'security-and-trust': {
      auditRefs: [
        ...securityAudits,
      ],
    },

    // 15% SEO (Search Visibility and Navigation)
    seo: {
      auditRefs: [
        { id: 'meta-description', weight: 1, group: 'seo' }, // Meta tags
        { id: 'document-title', weight: 1, group: 'seo' }, // Page titles
        { id: 'link-text', weight: 1, group: 'seo' }, // Descriptive links
        { id: 'is-crawlable', weight: 1, group: 'seo' }, // Placeholder for structured data
      ],
    },

    // 20% Data Richness (Custom Category)
    accessibility: { //'data-richness'
      title: 'Data Richness',
      description: 'Audits for data richness and element indexability',
      auditRefs: [
        { id: 'crawlable-anchors', weight: 1, group: 'accessibility' }, // Indexed elements
        { id: 'image-alt', weight: 1, group: 'accessibility' }, // Named element (Image Alt)
        { id: 'uses-passive-event-listeners', weight: 1, group: 'accessibility' }, // Passive event listeners
        { id: 'doctype', weight: 1, group: 'accessibility' }, // Placeholder for data layers
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
