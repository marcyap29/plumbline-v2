# Plumbline

MBSE for people who get lost in MBSE. **Know why the next diagram comes next.**

Plumbline is a browser app for practicing SysML the top-down way. Guided mode walks you through the path (needs, functions, requirements, architecture, verification) and checks your work at each step. Sandbox mode lets you model freely.

Status: v0.1 skeleton. Today it shows the requirements table for a made-up delivery drone and runs rule checks on it.

## Run it

```
npm install
npm run dev     # open the link it prints
npm test        # run the rule-check tests
```

## How the code is laid out

- `src/model/` holds the model: elements (needs, functions, requirements, blocks, test cases) and the arrows between them. Diagrams will be views of this; they never own data.
- `src/model/rules.ts` says which element kinds each arrow may connect. Refine, Satisfy and Verify point at the requirement. Derive points from the derived requirement to its source. Allocate points from a function to a block. Containment is nesting, not an arrow.
- `src/checks/` holds the rule checks. Each one is a small function that reads the model and returns findings in plain English.
- `src/examples/` holds made-up example systems. No real program material, ever.

## License

AGPL-3.0-only. Copyright Marc Yap. Contributors must agree to the [CLA](CLA.md) before a pull request can be merged. See [CONTRIBUTING.md](CONTRIBUTING.md).
