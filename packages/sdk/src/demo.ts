/* (c) Copyright Frontify Ltd., all rights reserved. */

import { components, tokens } from './index';

/** Tiny helper: throw if a lookup misses. Data is bundled, so misses indicate a typo. */
const must = <T>(value: T | undefined, what: string): T => {
    if (value === undefined) {
        throw new Error(`Missing ${what}`);
    }
    return value;
};

// ─── Basics ─────────────────────────────────────────────────────────────────

// 1. Look up a component and read scalar fields.
const button = must(components.get('Button'), 'component "Button"');
console.log('Button props:', button.props.length, 'examples:', button.examples.length);

// 2. Get the canonical example for a component.
const canonical = button.examples.find((e) => e.isCanonical);
console.log('canonical Button example:', canonical?.name);

// 3. Inspect sub-components and their props.
const dialog = must(components.get('Dialog'), 'component "Dialog"');
console.log(
    'Dialog sub-components:',
    dialog.subComponents.map((sc) => sc.name),
);
const header = must(
    dialog.subComponents.find((sc) => sc.name === 'Dialog.Header'),
    'sub-component "Dialog.Header"',
);
console.log('Dialog.Header props:', header.props.length);

// ─── Walking the graph ─────────────────────────────────────────────────────

console.log('#########');
console.log(button.tags()[0]?.where({ status: 'released' }));
console.log('#########');
// 4. Siblings in the same category.
const inputSiblings = button.category().list();
console.log(
    'input-category siblings:',
    inputSiblings.map((c) => c.name),
);

// 5. Components related to Button (cross-references).
console.log(
    'related to Button:',
    button.related().map((c) => c.name),
);

// 6. All components tagged "action" that are released.
const actionFacet = must(components.tag('action'), 'tag "action"');
const releasedActions = actionFacet.where({ status: 'released' });
console.log(
    'released "action" components:',
    releasedActions.map((c) => c.name),
);

// ─── Facets as scoped queries ──────────────────────────────────────────────

// 7. Find within a single category.
const input = must(components.category('input'), 'category "input"');
console.log('input.size:', input.size);

const inputForms = input.where({ tag: 'form' });
console.log(
    'input components also tagged "form":',
    inputForms.map((c) => c.name),
);

console.log('input.get("Button"):', input.get('Button')?.name);
console.log('input.get("Dialog"):', input.get('Dialog')); // undefined — Dialog is overlay
console.log('input.has("Checkbox"):', input.has('Checkbox'));

// 8. Iterate every category with its size.
console.log('component categories:');
for (const cat of components.categories()) {
    console.log(`  - ${cat.name} (${cat.size})`);
}

// ─── Icons in the components graph ─────────────────────────────────────────

// 9. Icons live under category: 'icon'.
const iconFacet = must(components.category('icon'), 'category "icon"');
console.log('icon count:', iconFacet.size);
console.log(
    'first 3 icons:',
    iconFacet
        .list()
        .slice(0, 3)
        .map((c) => c.name),
);

// 10. Find icons by tag through the components API.
const adobeIcons = components.where({ category: 'icon', tag: 'adobe' });
console.log(
    'adobe icons:',
    adobeIcons.map((c) => c.name),
);

// ─── Tokens ────────────────────────────────────────────────────────────────

// 11. Look up a token and walk to its category siblings.
const primary = must(tokens.get('color-charts-primary-default'), 'token "color-charts-primary-default"');
console.log('primary token type:', primary.type().name);
console.log('siblings in same category:', primary.category().size);

// 12. Filter tokens.
const themeableColors = tokens.where({ category: 'colors', themeable: true });
console.log('themeable color count:', themeableColors.length);

// 13. Token utilities.
const bodyUtils = tokens.utilities.where({ keyPathStartsWith: 'utilities.text.body' });
console.log(
    'body-* utility classes:',
    bodyUtils.map((u) => u.tailwindClass),
);
