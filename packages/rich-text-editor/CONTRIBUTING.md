# Contributing to @frontify/fondue-rich-text-editor

Every test title carries the ID of the requirement it proves, such as `SPEC-rich-text-quality/AC-044`.

Lint fixtures live in a `__lint-fixtures__` folder inside the folder whose rule they test. A `// expect-lint: <rule>` comment names an error on the next line, and `scripts/lint-fixtures.test.ts` asserts that each fixture reports exactly its expected errors.

## Review checklist
