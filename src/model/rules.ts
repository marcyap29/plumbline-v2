import type { ElementKind, RelationshipKind } from "./types";

// Which element kinds may sit at each end of each arrow.
// Refine, Satisfy and Verify point from the model element TO the requirement.
// Derive points from the derived requirement TO its source requirement.
// Allocate points from the function/action TO the block.
// Containment is not here: it is nesting (Element.parentId), not an arrow.
export const relationshipEnds: Record<
  RelationshipKind,
  { source: ElementKind[]; target: ElementKind[] }
> = {
  refine:   { source: ["function"],    target: ["requirement"] },
  satisfy:  { source: ["block"],       target: ["requirement"] },
  derive:   { source: ["requirement"], target: ["requirement"] },
  verify:   { source: ["testCase"],    target: ["requirement"] },
  allocate: { source: ["function"],    target: ["block"] },
};
