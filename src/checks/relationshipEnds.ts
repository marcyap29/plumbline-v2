import type { RuleCheck, Finding } from "./types";
import { findElement } from "../model/model";
import { relationshipEnds } from "../model/rules";

// Rule: each arrow must connect the right kinds of element, in the right direction.
// Catches things like a requirement Satisfying a block (arrow backwards).
export const relationshipEndsCheck: RuleCheck = {
  id: "relationship-ends",
  title: "Relationships connect the right elements",
  run(model) {
    const findings: Finding[] = [];
    for (const r of model.relationships) {
      const source = findElement(model, r.sourceId);
      const target = findElement(model, r.targetId);
      const allowed = relationshipEnds[r.kind];
      if (!source || !target) {
        findings.push({ checkId: "relationship-ends", elementId: r.id, message: `A ${r.kind} points at an element that no longer exists.` });
        continue;
      }
      if (!allowed.source.includes(source.kind) || !allowed.target.includes(target.kind)) {
        findings.push({
          checkId: "relationship-ends",
          elementId: r.id,
          message: `${r.kind} from ${source.kind} "${source.name}" to ${target.kind} "${target.name}" isn't valid. A ${r.kind} goes from ${allowed.source.join("/")} to ${allowed.target.join("/")}.`,
        });
      }
    }
    return findings;
  },
};
