Read the Tailwind config at `packages/tokens/dist/tailwind/tailwind.config.js` and the existing AI documentation at `packages/tokens/AI.md`.

Regenerate `packages/tokens/AI.md` to reflect the current state of the Tailwind config. The documentation must:

1. Keep the same structure and sections as the existing file
2. Update all class names, tokens, and values to match what's currently in the Tailwind config
3. Add any new token categories or classes that were added to the config but are missing from the docs
4. Remove any classes documented that no longer exist in the config
5. Preserve the usage-focused tone — each class should explain *when* to use it, not just what it is
6. Keep the component preference table accurate — check `packages/components/src/components/` for the current list of available Fondue components
7. Keep the common patterns section using valid, current class names

Also read `packages/tokens/dist/json/colors.json` and `packages/tokens/dist/json/semantic.json` to verify completeness of documented tokens.

After regenerating, diff the old and new versions and summarize what changed.
