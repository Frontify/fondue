# Contributing to the rich text editor

## Review checklist

- A change to `size-budgets.json` or `perf/budgets.json` comes with the reason and a decision record ID in its changeset, since a budget changes only through a decision record.
- A change to `perf/method.json` comes with a decision record ID in its changeset, since the runner, browser, throttling, warm-up and sample count are the method the budgets hold under. The browser rows measure the source as the Playwright component test build bundles it, unminified and with `react-dom/profiling`, which the Method paragraph names for the perf CT Vite config.
- A new feature in the core registry comes with its vocabulary part, editor part, fixtures and stories, and owners come from `.github/CODEOWNERS` while the contract spec checks dependencies and licenses; a feature without them ships as an optional module outside the registry.
