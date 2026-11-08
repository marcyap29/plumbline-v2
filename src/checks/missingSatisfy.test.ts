import { deliveryDrone } from "../examples/deliveryDrone";
import { missingSatisfy } from "./missingSatisfy";

// Marc: when your check works, change `it.todo` to `it` and run `npm test`.
describe("missing Satisfy (Marc's check)", () => {
  it.todo("finds only the noise requirement in the drone model", () => {
    const found = missingSatisfy.run(deliveryDrone).map((f) => f.elementId);
    expect(found).toEqual(["REQ-3"]);
  });
});
