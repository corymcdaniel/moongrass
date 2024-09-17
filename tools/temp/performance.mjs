import engagement, {enrAuditRefs} from "./performance/engagement.mjs";
import userFrustrationMitigation, {ufmAuditRefs} from "./performance/userFrustrationMitigation.mjs";
import practicesAndEfficiency, {pneAuditRefs} from "./performance/practicesAndEfficiency.mjs";

export const performanceAuditRefs =  [
  ...enrAuditRefs,
  ...ufmAuditRefs,
  ...pneAuditRefs
];

export default {
  ...engagement,
  ...userFrustrationMitigation,
  ...practicesAndEfficiency
}
