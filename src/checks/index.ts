import type { Model } from "../model/types";
import type { Finding, RuleCheck } from "./types";
import { missingVerify } from "./missingVerify";
import { missingSatisfy } from "./missingSatisfy";
import { noParent } from "./noParent";
import { orphans } from "./orphans";
import { relationshipEndsCheck } from "./relationshipEnds";

export const allChecks: RuleCheck[] = [
  relationshipEndsCheck,
  noParent,
  missingSatisfy,
  missingVerify,
  orphans,
];

export function runAllChecks(model: Model): Finding[] {
  return allChecks.flatMap((c) => c.run(model));
}
