import type { RuleCheck } from "./types";

// Rule: an element with no relationships at all (in or out) is an orphan.
// Needs are exempt: they sit at the top and get traced to by name in v0.1.
export const orphans: RuleCheck = {
  id: "orphan",
  title: "No orphan elements",
  run(model) {
    const linked = new Set<string>();
    for (const r of model.relationships) {
      linked.add(r.sourceId);
      linked.add(r.targetId);
    }
    return model.elements
      .filter((e) => e.kind !== "need" && !linked.has(e.id))
      .map((e) => ({
        checkId: "orphan",
        elementId: e.id,
        message: `"${e.name}" isn't connected to anything. Link it into the model or delete it.`,
      }));
  },
};
