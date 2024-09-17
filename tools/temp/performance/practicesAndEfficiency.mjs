const category = {
  'practices-and-efficiency': {
    auditRefs: [
      //Modern Javascript:
      { id: 'unused-javascript', weight: 1, group: 'metrics' },
      { id: 'unminified-javascript', weight: 1, group: 'metrics' },
      { id: 'uses-passive-event-listeners', weight: 1, group: 'metrics' },
      { id: 'third-party-summary', weight: 1, group: 'metrics' },

      // Efficient resources
      { id: 'efficient-animated-content', weight: 1, group: 'efficient-resources' },
      { id: 'total-byte-weight', weight: 1, group: 'efficient-resources' },
      { id: 'uses-optimized-images', weight: 1, group: 'efficient-resources' },
      { id: 'offscreen-images', weight: 1, group: 'efficient-resources' },
      { id: 'render-blocking-resources', weight: 1, group: 'efficient-resources' },
      //{ id: 'uses-rel-preload', weight: 1, group: 'efficient-resources' },
      { id: 'uses-rel-preconnect', weight: 1, group: 'efficient-resources' },
      { id: 'unused-css-rules', weight: 1, group: 'efficient-resources' },
      { id: 'unused-javascript', weight: 1, group: 'efficient-resources' },
      { id: 'uses-text-compression', weight: 1, group: 'efficient-resources' },

      // Console data capture
      { id: 'errors-in-console', weight: 1, group: 'console-data-capture' },
      { id: 'third-party-summary', weight: 1, group: 'console-data-capture' },
      { id: 'unused-javascript', weight: 1, group: 'console-data-capture' },
      { id: 'uses-passive-event-listeners', weight: 1, group: 'console-data-capture' },
      { id: 'unminified-javascript', weight: 1, group: 'console-data-capture' },

      // Network data capture
      { id: 'total-byte-weight', weight: 1, group: 'network-data-capture' },
      { id: 'uses-optimized-images', weight: 1, group: 'network-data-capture' },
      { id: 'uses-text-compression', weight: 1, group: 'network-data-capture' },
      { id: 'uses-rel-preconnect', weight: 1, group: 'network-data-capture' },
      //{ id: 'uses-rel-preload', weight: 1, group: 'network-data-capture' },
      { id: 'third-party-summary', weight: 1, group: 'network-data-capture' },
      { id: 'render-blocking-resources', weight: 1, group: 'network-data-capture' },
      { id: 'server-response-time', weight: 1, group: 'network-data-capture' },
      { id: 'efficient-animated-content', weight: 1, group: 'network-data-capture' },
    ]
  }
}

export const pneAuditRefs = category['practices-and-efficiency'].auditRefs.map(obj => obj.id);

export default category;
