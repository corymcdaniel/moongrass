import httpsAudits from './security/https.mjs';
import noSecurityVulnerabilities from "./security/noSecurityVulnerabilities.mjs";
import formPrivacy from "./security/formPrivacy.mjs";

export const securityAuditRefs = [
  ...httpsAudits,
  ...noSecurityVulnerabilities,
  ...formPrivacy
];

export const securityAuditRefList = securityAuditRefs.map(a => a.id);

export default securityAuditRefs
