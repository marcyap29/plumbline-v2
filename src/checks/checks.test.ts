import { deliveryDrone } from "../examples/deliveryDrone";
import { missingVerify } from "./missingVerify";
import { noParent } from "./noParent";
import { orphans } from "./orphans";
import { relationshipEndsCheck } from "./relationshipEnds";
import type { Model } from "../model/types";

const ids = (fs: { elementId: string }[]) => fs.map((f) => f.elementId).sort();

describe("rule checks on the delivery drone", () => {
  it("missing Verify finds only the wind requirement", () => {
    expect(ids(missingVerify.run(deliveryDrone))).toEqual(["REQ-2.2"]);
  });

  it("every drone requirement has a parent", () => {
    expect(noParent.run(deliveryDrone)).toEqual([]);
  });

  it("no orphans in the drone model", () => {
    expect(orphans.run(deliveryDrone)).toEqual([]);
  });

  it("all drone relationships connect valid ends", () => {
    expect(relationshipEndsCheck.run(deliveryDrone)).toEqual([]);
  });
});

describe("rule checks catch mistakes", () => {
  const base: Model = {
    name: "test",
    elements: [
      { id: "R", kind: "requirement", name: "R" },
      { id: "B", kind: "block", name: "B" },
    ],
    relationships: [],
  };

  it("flags a backwards Satisfy (requirement to block)", () => {
    const m = { ...base, relationships: [{ id: "x", kind: "satisfy" as const, sourceId: "R", targetId: "B" }] };
    expect(ids(relationshipEndsCheck.run(m))).toEqual(["x"]);
  });

  it("flags a requirement with no parent", () => {
    expect(ids(noParent.run(base))).toEqual(["R"]);
  });

  it("flags unconnected elements as orphans", () => {
    expect(ids(orphans.run(base))).toEqual(["B", "R"]);
  });
});
