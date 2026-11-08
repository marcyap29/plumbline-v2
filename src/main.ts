import { deliveryDrone } from "./examples/deliveryDrone";
import { elementsOfKind, findElement, incoming } from "./model/model";
import { fromFile, loadFromBrowser, saveToBrowser, toFile } from "./model/storage";
import type { Model, RelationshipKind } from "./model/types";
import { runAllChecks } from "./checks";

let model: Model = loadFromBrowser() ?? structuredClone(deliveryDrone);

function namesPointingAt(id: string, kind: RelationshipKind): string {
  return incoming(model, id, kind)
    .map((r) => findElement(model, r.sourceId)?.name ?? "?")
    .join(", ");
}

function cell(text: string, missing = false): HTMLTableCellElement {
  const td = document.createElement("td");
  td.textContent = text || "missing";
  if (missing || !text) td.className = "missing";
  return td;
}

function render(): void {
  document.getElementById("model-name")!.textContent = model.name;

  const tbody = document.querySelector("#requirements tbody")!;
  tbody.replaceChildren();
  for (const req of elementsOfKind(model, "requirement")) {
    const tr = document.createElement("tr");
    tr.append(
      cell(req.id),
      cell(req.text ?? req.name),
      cell(namesPointingAt(req.id, "satisfy")),
      cell(namesPointingAt(req.id, "verify")),
    );
    tbody.append(tr);
  }

  const list = document.getElementById("findings")!;
  list.replaceChildren();
  const findings = runAllChecks(model);
  if (findings.length === 0) {
    const li = document.createElement("li");
    li.className = "ok";
    li.textContent = "All checks pass.";
    list.append(li);
  }
  for (const f of findings) {
    const li = document.createElement("li");
    li.textContent = f.message;
    list.append(li);
  }

  saveToBrowser(model);
}

document.getElementById("export")!.addEventListener("click", () => {
  const blob = new Blob([toFile(model)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${model.name.toLowerCase().replace(/\s+/g, "-")}.plumbline.json`;
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById("import")!.addEventListener("change", async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  try {
    model = fromFile(await file.text());
    render();
  } catch (err) {
    alert((err as Error).message);
  }
});

document.getElementById("reset")!.addEventListener("click", () => {
  model = structuredClone(deliveryDrone);
  render();
});

render();
