import type { Element, ElementKind, Model, Relationship, RelationshipKind } from "./types";

// Small helpers that rule checks read like plain English with.

export function elementsOfKind(model: Model, kind: ElementKind): Element[] {
  return model.elements.filter((e) => e.kind === kind);
}

export function findElement(model: Model, id: string): Element | undefined {
  return model.elements.find((e) => e.id === id);
}

/** Arrows of a given kind that point AT this element. */
export function incoming(model: Model, elementId: string, kind: RelationshipKind): Relationship[] {
  return model.relationships.filter((r) => r.kind === kind && r.targetId === elementId);
}

/** Arrows of a given kind that start FROM this element. */
export function outgoing(model: Model, elementId: string, kind: RelationshipKind): Relationship[] {
  return model.relationships.filter((r) => r.kind === kind && r.sourceId === elementId);
}

/** Elements nested directly under this one (containment). */
export function children(model: Model, elementId: string): Element[] {
  return model.elements.filter((e) => e.parentId === elementId);
}
