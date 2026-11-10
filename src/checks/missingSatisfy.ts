import type { RuleCheck } from "./types";

// MARC'S FIRST CHECK. Open missingVerify.ts next to this file; yours has the same shape.
//
// Rule: every requirement needs at least one block that Satisfies it.
// Question to answer before you code: which way does the Satisfy arrow point,
// and so should you use incoming() or outgoing()?
//
// When it works, open missingSatisfy.test.ts and change `it.todo` to `it`.
export const missingSatisfy: RuleCheck = {
  id: "missing-satisfy",
  title: "Every requirement has a Satisfy",
  run(_model) {
    return []; // replace this
  },
};
