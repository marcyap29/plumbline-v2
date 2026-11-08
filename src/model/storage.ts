import type { Model } from "./types";

const KEY = "plumbline.model";

/** Save to this browser. Fails quietly in private windows. */
export function saveToBrowser(model: Model): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(model));
  } catch {
    /* storage unavailable */
  }
}

export function loadFromBrowser(): Model | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Model) : null;
  } catch {
    return null;
  }
}

/** Model file format: plain JSON with a version tag so later versions can migrate it. */
export function toFile(model: Model): string {
  return JSON.stringify({ format: "plumbline", version: 1, model }, null, 2);
}

export function fromFile(text: string): Model {
  const data = JSON.parse(text);
  if (data?.format !== "plumbline" || !data.model) {
    throw new Error("Not a Plumbline model file.");
  }
  return data.model as Model;
}
