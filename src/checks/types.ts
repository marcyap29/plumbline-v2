import type { Model } from "../model/types";

export interface Finding {
  checkId: string;
  elementId: string;
  message: string; // plain English, says what's wrong and what to do
}

/** A rule check reads the model and returns what it found. Empty list = all good. */
export type RuleCheck = {
  id: string;
  title: string;
  run: (model: Model) => Finding[];
};
