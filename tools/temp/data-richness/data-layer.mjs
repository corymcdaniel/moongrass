export default [
  { id: 'errors-in-console', weight: 1, group: 'data-richness' },  // No JavaScript errors in console
  { id: 'total-blocking-time', weight: 1, group: 'data-richness' },  // Minimize blocking time of JavaScript interacting with the data layer
  { id: 'third-party-summary', weight: 1, group: 'data-richness' },  // Track third-party scripts interacting with the data layer
  //{ id: 'uses-secure-cookies', weight: 1, group: 'data-richness' },  // Ensure cookies related to the data layer are secure
  { id: 'bootup-time', weight: 1, group: 'data-richness' },  // JavaScript bootup time for data layer scripts
  //breaking:{ id: 'render-blocking-resources', weight: 1, group: 'data-richness' },  // Avoid render-blocking data layer scripts
  { id: 'dom-size', weight: 1, group: 'data-richness' },  // Ensure the data layer doesn’t contribute to DOM bloat
  //{ id: 'x-content-type-options', weight: 1, group: 'data-richness' },  // Respect privacy regulations with data layer usage (can be custom)
]
