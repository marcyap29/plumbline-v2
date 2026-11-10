import type { Model } from "../model/types";

// Made-up example system. Not based on any real program.
// It has two deliberate gaps so the checks have something to find:
//   - REQ-3 (noise) has no block Satisfying it
//   - REQ-2.2 (wind) has no test case Verifying it
export const deliveryDrone: Model = {
  name: "Delivery drone",
  elements: [
    // Step 1: needs
    { id: "N-1", kind: "need", name: "Get small packages to customers fast", text: "Customers want packages under 2 kg delivered within 30 minutes." },
    { id: "N-2", kind: "need", name: "Don't bother the neighbors", text: "Residents don't want loud aircraft over their homes." },

    // Step 3: functions (verbs)
    { id: "F-1", kind: "function", name: "Carry package" },
    { id: "F-2", kind: "function", name: "Navigate to address" },
    { id: "F-3", kind: "function", name: "Fly quietly" },

    // Step 5: requirements
    { id: "REQ-1", kind: "requirement", name: "Payload", text: "The drone shall carry a payload of up to 2 kg." },
    { id: "REQ-2", kind: "requirement", name: "Delivery range and conditions", text: "The drone shall deliver to addresses within 10 km in winds up to 25 km/h." },
    { id: "REQ-2.1", kind: "requirement", name: "Range", text: "The drone shall deliver to addresses within 10 km.", parentId: "REQ-2" },
    { id: "REQ-2.2", kind: "requirement", name: "Wind", text: "The drone shall operate in winds up to 25 km/h.", parentId: "REQ-2" },
    { id: "REQ-3", kind: "requirement", name: "Noise", text: "The drone shall produce no more than 60 dBA at 30 m." },
    { id: "REQ-4", kind: "requirement", name: "Battery capacity", text: "The battery shall store at least 400 Wh." },

    // Step 6: logical architecture
    { id: "B-1", kind: "block", name: "Delivery Drone" },
    { id: "B-2", kind: "block", name: "Payload Bay", parentId: "B-1" },
    { id: "B-3", kind: "block", name: "Navigation", parentId: "B-1" },
    { id: "B-4", kind: "block", name: "Power", parentId: "B-1" },

    // Step 9: verification
    { id: "T-1", kind: "testCase", name: "Payload lift test" },
    { id: "T-2", kind: "testCase", name: "10 km range flight" },
    { id: "T-3", kind: "testCase", name: "Noise measurement" },
    { id: "T-4", kind: "testCase", name: "Battery capacity test" },
  ],
  relationships: [
    { id: "r1", kind: "refine", sourceId: "F-1", targetId: "REQ-1" },
    { id: "r2", kind: "refine", sourceId: "F-2", targetId: "REQ-2" },
    { id: "r3", kind: "refine", sourceId: "F-3", targetId: "REQ-3" },
    { id: "r4", kind: "derive", sourceId: "REQ-4", targetId: "REQ-2.1" },

    { id: "r5", kind: "allocate", sourceId: "F-1", targetId: "B-2" },
    { id: "r6", kind: "allocate", sourceId: "F-2", targetId: "B-3" },

    { id: "r7", kind: "satisfy", sourceId: "B-2", targetId: "REQ-1" },
    { id: "r8", kind: "satisfy", sourceId: "B-1", targetId: "REQ-2" },
    { id: "r9", kind: "satisfy", sourceId: "B-3", targetId: "REQ-2.1" },
    { id: "r10", kind: "satisfy", sourceId: "B-1", targetId: "REQ-2.2" },
    { id: "r11", kind: "satisfy", sourceId: "B-4", targetId: "REQ-4" },

    { id: "r12", kind: "verify", sourceId: "T-1", targetId: "REQ-1" },
    { id: "r13", kind: "verify", sourceId: "T-2", targetId: "REQ-2" },
    { id: "r14", kind: "verify", sourceId: "T-2", targetId: "REQ-2.1" },
    { id: "r15", kind: "verify", sourceId: "T-3", targetId: "REQ-3" },
    { id: "r16", kind: "verify", sourceId: "T-4", targetId: "REQ-4" },
  ],
};
