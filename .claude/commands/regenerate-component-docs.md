Read all component source files in `packages/components/src/components/*/` and the existing AI documentation at `packages/components/AI.md`.

Regenerate `packages/components/AI.md` to reflect the current state of the component library. The documentation must:

1. Keep the same structure and sections as the existing file
2. Update all component names, props, default values, and composition patterns to match what's currently in the source code
3. Add any new components that were added but are missing from the docs
4. Remove any components documented that no longer exist
5. Preserve the usage-focused tone — each component should explain *when* to use it, not just what it does
6. Keep the Component Selection Guide table complete — check `packages/components/src/index.ts` for the current list of exported components
7. Keep the common patterns section using valid, current component APIs
8. For each component, verify the underlying Radix UI primitive is correctly noted (check import statements in source)
9. Verify compound component sub-components match actual exports (e.g., `Dialog.Root`, `Dialog.Trigger`, etc.)

Also read `packages/components/src/index.ts` to verify every exported component is documented.

After regenerating, diff the old and new versions and summarize what changed.
