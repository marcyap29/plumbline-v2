import { deliveryDrone } from "../examples/deliveryDrone";
import { fromFile, toFile } from "./storage";

describe("model file", () => {
  it("round-trips through export and import", () => {
    expect(fromFile(toFile(deliveryDrone))).toEqual(deliveryDrone);
  });

  it("rejects files that aren't Plumbline models", () => {
    expect(() => fromFile('{"hello":1}')).toThrow();
  });
});
