# Bug report: `git-ai stats <A>..<B>` drops human authorship (range form buckets human lines as `unknown`)

## Environment
- git-ai **v1.6.11** (`git-ai-linux-x64` in CI; same behavior on the macOS local build)
- Authorship note schema: `authorship/3.0.0`
- Repo: linear history, no merge commits in the range

## Summary
The **range form** of `git-ai stats` (`stats A..B --json`) reports `human_additions: 0` and instead
counts those lines under `unknown_additions` — even though the per-commit authorship notes correctly
attribute the lines to a human. The **single-commit form** (`stats <sha> --json`) reports the exact
same lines as `human_additions`. AI attribution (`ai_additions`, `tool_model_breakdown`) is
unaffected; only **human** is lost in the range form.

## Impact
The docs recommend `git ai stats <start>..<end> --json` as the way to build dashboards. Anything built
on that path systematically reports **human = 0** and inflates `unknown` by the same amount. Our
GitHub Actions PR-summary job showed `human_additions: 0` for a PR that was ~40% hand-written, until
we worked around it. It makes the range form unusable for human-vs-AI reporting.

## Minimal reproduction
Take any single commit `C` (parent `P`) that contains human-authored lines.

- `git-ai stats C --json`      → `human_additions: N` (N > 0)   ✅ correct
- `git-ai stats P..C --json`   → `human_additions: 0`, `unknown_additions` up by N   ❌ wrong

Concrete run — commit `9ad41535b` is a 3-line human edit; its parent is `42abb381`:

```
$ git-ai stats 9ad41535b --json
{"human_additions":3,"unknown_additions":0,"ai_additions":0,
 "ai_accepted":0,"git_diff_added_lines":3,"git_diff_deleted_lines":1,"tool_model_breakdown":{}}

$ git-ai stats 42abb381..9ad41535b --json     # range spanning exactly that one commit
{... "range_stats":{"human_additions":0,"unknown_additions":3,"ai_additions":0,
     "ai_accepted":0,"git_diff_added_lines":3,"git_diff_deleted_lines":1,"tool_model_breakdown":{}}}
```

Same diff, same note — the 3 human lines become 3 `unknown` lines purely by switching to the range
form. Widening the range keeps `human` pinned at 0 while `unknown` accumulates:

```
range width          human  unknown  ai
1 commit  (P..C)       0       3      0
2 commits              0       3      4
3 commits              0       4      4
6 commits (full PR)    0      23     28
```

Summing the single-commit form over the same commits gives the correct split
(`human 21, unknown 3, ai 28`).

## The data is present — the range path just doesn't read it
The human attribution is stored in the commit note; the range aggregation is not consuming the
`humans` block:

```
$ git notes --ref=ai show 9ad41535b
packages/sdk/docs/mental-model.md
  h_2139c5e5c94509 91-92,102
---
{
  "schema_version": "authorship/3.0.0",
  "git_ai_version": "1.6.11",
  "humans": { "h_2139c5e5c94509": { "author": "Noah Waldner <noah.waldner@frontify.com>" } }
}
```

## Related inconsistency: text vs JSON in range mode
- `git-ai diff A..B` (text) **does** render human lines — e.g. `+### this is a test  👤 Noah Waldner`.
- `git-ai diff A..B --json` `annotations` contain **only** AI keys (`s_…::t_…`); there are **no**
  `h_…` keys at all.
- `git-ai stats A..B --json` reports `human_additions: 0`.

So the text renderer resolves human authorship across a range, but **both** machine-readable range
outputs drop it. This points at the range → JSON aggregation path as where human attribution is lost.

## Expected behavior
`git-ai stats A..B --json` should report `human_additions` consistent with the per-commit notes
(i.e. matching what the text `diff` and single-commit `stats` already report), not fold human lines
into `unknown_additions`.

## Current workaround
Sum the single-commit form across the range:

```sh
git rev-list "$BASE".."$HEAD" \
  | while read -r sha; do git-ai stats "$sha" --json; done \
  | jq -s 'reduce .[] as $c ({h:0,u:0,ai:0};
       .h += ($c.human_additions//0) | .u += ($c.unknown_additions//0) | .ai += ($c.ai_additions//0))'
```

Downside: a line edited in multiple commits is counted once per commit, so totals slightly exceed the
net diff. It does, however, surface human authorship correctly — which the range form does not.

## Questions for the team
1. Is the range form *supposed* to attribute human lines (as the docs imply), or is single-commit the
   only supported path today?
2. If it's a bug, is it fixed in a version newer than 1.6.11? (We're pinned to 1.6.11 in CI.)
3. Is the `stats`/`diff` range JSON dropping human by the same underlying cause, or two separate issues?
