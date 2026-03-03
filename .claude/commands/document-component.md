Document the component specified by `$ARGUMENTS` in `packages/components/src/components/`. If no component is specified, ask which one.

## Steps

1. **Read the source** — Read the component's `.tsx` file(s) and any `types.ts`. Identify all exported props types and the component export.
2. **Read the stories** — Read the `.stories.tsx` file if it exists.
3. **Read reference examples** — Read `packages/components/src/components/Button/Button.tsx` and `packages/components/src/components/Button/Button.stories.tsx` as the gold-standard reference for documentation style.
4. **Apply the rules below** to add or improve documentation in both the component source and the story file.

## JSDoc Rules for Props

Every exported prop must have a JSDoc comment. Follow these rules strictly:

### Voice & Tone
- Write from the perspective of a **product designer advising a developer** — explain *when* and *why*, not just *what*.
- Use second person sparingly. Prefer impersonal constructions: "Controls the…", "Defines the…", "Conveys the…"
- Be concise. One sentence is ideal. Two sentences max.
- Never restate the type or prop name. `size?: 'small' | 'medium' | 'large'` does NOT need "The size can be small, medium, or large."

### Describing Variants (union types)
When a prop accepts a union of string literals, explain when to use each option inline using backtick-quoted values:

```typescript
/**
 * Conveys the tone. `'default'` for neutral actions, `'positive'` for confirmations like "Approve", `'danger'` for irreversible actions like "Delete".
 * @default "default"
 */
variant?: 'default' | 'positive' | 'danger';
```

### @default Tag
- Always include `@default` when a default value exists.
- Always quote string defaults: `@default "medium"` (not `@default medium`).
- Boolean defaults: `@default false`.
- Number defaults: `@default 0`.

### Callback Props
- Start with "Callback fired when…" or "Event handler called when…"
- Include `@param` for non-obvious parameters.

```typescript
/**
 * Callback fired when the value changes.
 * @param value - The new slider value as an array of numbers
 */
onChange?: (value: number[]) => void;
```

### children Props
- Document what children are expected when there are constraints:

```typescript
/**
 * Should contain `Accordion.Item` components.
 */
children?: ReactNode;
```

- Skip documentation for generic `children?: ReactNode` with no constraints.

### Skip Documentation For
- `data-test-id` — self-explanatory
- `className` — self-explanatory
- Standard ARIA props from `CommonAriaProps` / `CommonAriaAttrs` — self-explanatory

### Compound Component Export
Add a top-level JSDoc comment to the compound export object:

```typescript
/**
 * A vertically stacked list of collapsible sections. Use `Accordion.Root` as the
 * container, `Accordion.Item` for each section, `Accordion.Header` for the trigger,
 * and `Accordion.Content` for the hidden panel.
 */
export const Accordion = { Root, Item, Header, Content };
```

## Storybook Description Rules

### Meta Description
Every story file must include a `docs.description.component` in `parameters`. Use this template:

```
Line 1: What it is — starts with "A" or "An", one sentence
Line 2: (blank)
Line 3: **When to use:** One sentence on the right context for this component
Line 4: (blank)
Line 5+: **Feature name:** One sentence per notable feature (optional, max 3)
```

Use `.join('\n')` for readability:

```typescript
parameters: {
    docs: {
        description: {
            component: [
                'A short, colored label for categorizing or highlighting status. Ideal for metadata, counts, or state indicators.',
                '',
                '**When to use:** To surface a quick status or category alongside other content — not for actions (use Button) or removable items (use Tag).',
                '',
                '**Icon:** Pass an icon as a child to reinforce meaning at a glance.',
            ].join('\n'),
        },
    },
},
```

### Description Language Rules
- Start the first line with an article ("A", "An")
- Use en-dashes (—) for parenthetical asides, not hyphens
- Bold feature labels: `**When to use:**`, `**Icon:**`, `**Accessibility:**`
- Keep the total description under 5 lines after blank-line separators
- Never mention implementation details (Radix, SCSS, etc.) in descriptions

### args Defaults
Set sensible `args` in meta that show the component in its most common state.

## Verification

After making changes:
1. Confirm every exported prop has JSDoc (except the skip list above)
2. Confirm the story has a `docs.description.component`
3. Confirm `@default` values match the actual defaults in the component
4. Confirm no prop description references the wrong component name
5. Summarize what you changed
