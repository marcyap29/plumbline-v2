// The model layer. Diagrams are views of this; they never own data.
// Kept notation-neutral so a SysML v2 view can map onto it later.

export type ElementKind =
  | "need"         // stakeholder need (step 1)
  | "function"     // verb phrase, e.g. "Deliver package" (step 3)
  | "requirement"  // "shall" statement (step 5)
  | "block"        // logical architecture element (step 6)
  | "testCase";    // verification (step 9)

export interface Element {
  id: string;
  kind: ElementKind;
  name: string;
  text?: string;      // requirement text, need statement, etc.
  parentId?: string;  // containment: the element that owns this one
}

export type RelationshipKind = "refine" | "satisfy" | "derive" | "verify" | "allocate";

// Every relationship is an arrow: from `source` to `target`.
export interface Relationship {
  id: string;
  kind: RelationshipKind;
  sourceId: string;
  targetId: string;
}

export interface Model {
  name: string;
  elements: Element[];
  relationships: Relationship[];
}
