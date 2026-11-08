import type { RuleCheck } from "./types";
import { elementsOfKind, incoming } from "../model/model";

// Worked example. Marc's first check (missingSatisfy.ts) follows the same shape.
//
// Rule: every requirement needs at least one test case that Verifies it.
// Verify points FROM the test case TO the requirement, so we look at
// arrows coming IN to each requirement.
export const missingVerify: RuleCheck = {
  id: "missing-verify",
  title: "Every requirement has a Verify",
  run(model) {
    return elementsOfKind(model, "requirement")
      .filter((req) => incoming(model, req.id, "verify").length === 0)
      .map((req) => ({
        checkId: "missing-verify",
        elementId: req.id,
        message: `"${req.name}" has no test case verifying it. Add a test case with a Verify to this requirement.`,
      }));
  },
};
