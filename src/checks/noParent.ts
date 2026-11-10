import type { RuleCheck } from "./types";
import { elementsOfKind, findElement, incoming, outgoing } from "../model/model";

// Rule: every requirement must trace back up to something.
// It counts as having a parent if ANY of these is true:
//   - it is nested under another requirement (Containment)
//   - it Derives from another requirement
//   - a function Refines it (the function came from a use case / need)
export const noParent: RuleCheck = {
  id: "no-parent",
  title: "Every requirement has a parent",
  run(model) {
    return elementsOfKind(model, "requirement")
      .filter((req) => {
        const container = req.parentId ? findElement(model, req.parentId) : undefined;
        const contained = container?.kind === "requirement";
        const derived = outgoing(model, req.id, "derive").length > 0;
        const refined = incoming(model, req.id, "refine").length > 0;
        return !contained && !derived && !refined;
      })
      .map((req) => ({
        checkId: "no-parent",
        elementId: req.id,
        message: `"${req.name}" doesn't trace up to anything. Nest it under a parent requirement, Derive it from one, or have a function Refine it.`,
      }));
  },
};
