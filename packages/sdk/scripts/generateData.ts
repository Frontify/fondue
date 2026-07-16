/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Build-time data generation for @frontify/fondue-sdk.
 *
 * Reads the manifests exported by the upstream @frontify/fondue-* packages
 * and emits the TypeScript modules that vite will bundle:
 *
 *   - src/__generated__/data.ts    — the full data snapshot
 *   - src/__generated__/unions.ts  — literal unions derived from the data
 *     (statuses, categories) so typos in filters fail at compile time.
 *
 * Icons are synthesized into the components list here so the runtime API has
 * only one entity kind to deal with. Fields that are "not applicable" are
 * normalized to `null` (never the empty string), and the whole snapshot is
 * validated — the build fails on missing statuses/categories, dangling
 * cross-references, or duplicate ids, so the runtime never has to.
 */

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface ComponentIndexEntry {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: string[];
    subComponentNames: string[];
    manifestPath: string;
}

interface RawProp {
    name: string;
    type: string;
    required: boolean;
    defaultValue: string | null;
    description: string;
    deprecated: boolean;
    deprecationMessage: string;
}

interface RawComponentDetail {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: string[];
    relatedComponents: string[];
    importStatement: string;
    instructions: string;
    props: RawProp[];
    subComponents: { name: string; props: RawProp[] }[];
    examples: unknown[];
    typeDefinitions: Record<string, string>;
}

interface IconEntry {
    name: string;
    description: string;
    componentName: string;
    importStatement: string;
    filled: boolean;
    availableSizes: number[];
    defaultSize: number;
    tags: string[];
    examples: unknown[];
}

interface RawToken {
    id: string;
    category: string;
    type: string;
    keyPath: string[];
    value: string;
    output: string;
    cssVariable: string | null;
    tailwindClass: string;
    themeable: boolean;
}

interface RawTokenUtility {
    id: string;
    keyPath: string[];
    properties: unknown[];
    tailwindClass: string;
    themeable: boolean;
}

/** The normalized component shape emitted into data.ts ('' sentinels become null). */
interface SdkProp extends Omit<RawProp, 'deprecationMessage'> {
    deprecationMessage: string | null;
}

interface SdkComponent {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: string[];
    subComponentNames: string[];
    relatedComponents: string[];
    importStatement: string;
    instructions: string | null;
    props: SdkProp[];
    subComponents: { name: string; props: SdkProp[] }[];
    examples: unknown[];
    typeDefinitions: Record<string, string>;
}

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const componentsIndex = require('@frontify/fondue-components/manifests/manifest') as {
    components: Record<string, ComponentIndexEntry>;
};
const icons = require('@frontify/fondue-icons/manifest.json') as { icons: IconEntry[] };
const tokensManifest = require('@frontify/fondue-tokens/manifest.json') as {
    tokens: RawToken[];
    utilities?: RawTokenUtility[];
};

// ─── Normalization ──────────────────────────────────────────────────────────
// The public contract uses `null` for "not applicable" — never ''.

const normalizeProp = (prop: RawProp): SdkProp => ({
    ...prop,
    deprecationMessage: prop.deprecationMessage || null,
});

const realComponents = Object.values(componentsIndex.components).map((entry): SdkComponent => {
    const stem = entry.manifestPath.replace(/\.json$/i, '');
    const detail = require(`@frontify/fondue-components/manifests/${stem}`) as RawComponentDetail;
    return {
        name: detail.name,
        description: detail.description,
        status: detail.status,
        category: detail.category,
        tags: detail.tags,
        subComponentNames: entry.subComponentNames,
        relatedComponents: detail.relatedComponents,
        importStatement: detail.importStatement,
        instructions: detail.instructions || null,
        props: detail.props.map(normalizeProp),
        subComponents: detail.subComponents.map((sub) => ({ ...sub, props: sub.props.map(normalizeProp) })),
        examples: detail.examples,
        typeDefinitions: detail.typeDefinitions,
    };
});

const iconComponents = icons.icons.map(
    (icon): SdkComponent => ({
        name: icon.componentName,
        description: icon.description,
        status: 'released',
        category: 'icon',
        tags: icon.tags,
        subComponentNames: [],
        relatedComponents: [],
        importStatement: icon.importStatement,
        instructions: null,
        props: [],
        subComponents: [],
        examples: icon.examples,
        typeDefinitions: {},
    }),
);

const components = [...realComponents, ...iconComponents];
// `output` is a build-system concern — consumers only need `cssVariable`'s
// nullability (null ⇢ inlined literal). Validate against it below, but strip
// it from the published data.
const tokens = tokensManifest.tokens.map(({ output: _output, ...token }) => token);
const tokenUtilities = tokensManifest.utilities ?? [];

const guidesDir = join(__dirname, '../guides');
const titleFromMarkdown = (md: string, fallback: string): string => {
    const match = /^#\s+(.+)$/m.exec(md);
    return match ? match[1].trim() : fallback;
};
const guides = readdirSync(guidesDir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
        const id = basename(file, '.md');
        const content = readFileSync(join(guidesDir, file), 'utf8');
        return { id, title: titleFromMarkdown(content, id), content };
    });

// ─── Validation ─────────────────────────────────────────────────────────────
// Fail the build on inconsistent data so the runtime can rely on it.

const errors: string[] = [];

const requireUnique = (kind: string, ids: readonly string[]): void => {
    const seen = new Set<string>();
    for (const id of ids) {
        if (seen.has(id)) {
            errors.push(`duplicate ${kind} "${id}"`);
        }
        seen.add(id);
    }
};

const componentNames = new Set(components.map((component) => component.name));
requireUnique('component name', [...components.map((component) => component.name)]);
for (const component of components) {
    if (!component.name) {
        errors.push('component with empty name');
    }
    if (!component.status) {
        errors.push(`component "${component.name}" has no status`);
    }
    if (!component.category) {
        errors.push(`component "${component.name}" has no category`);
    }
    for (const related of component.relatedComponents) {
        if (!componentNames.has(related)) {
            errors.push(`component "${component.name}" references unknown related component "${related}"`);
        }
    }
}

requireUnique(
    'token id',
    tokens.map((token) => token.id),
);
for (const token of tokensManifest.tokens) {
    if (!token.id) {
        errors.push('token with empty id');
    }
    if (!token.category) {
        errors.push(`token "${token.id}" has no category`);
    }
    if (token.output !== 'variable' && token.output !== 'value') {
        errors.push(`token "${token.id}" has invalid output "${token.output}"`);
    }
    if ((token.output === 'variable') !== (token.cssVariable !== null)) {
        errors.push(`token "${token.id}" output "${token.output}" is inconsistent with cssVariable`);
    }
    if (!token.tailwindClass) {
        errors.push(`token "${token.id}" has no tailwindClass`);
    }
}

requireUnique(
    'token utility id',
    tokenUtilities.map((utility) => utility.id),
);
for (const utility of tokenUtilities) {
    if (!utility.tailwindClass) {
        errors.push(`token utility "${utility.id}" has no tailwindClass`);
    }
}

requireUnique(
    'guide id',
    guides.map((guide) => guide.id),
);

if (errors.length > 0) {
    console.error(`✗ Data validation failed with ${errors.length} error(s):`);
    for (const error of errors) {
        console.error(`  - ${error}`);
    }
    process.exit(1);
}

// ─── Emission ───────────────────────────────────────────────────────────────

const stringify = (value: unknown): string => JSON.stringify(value, null, 4);

const unionOf = (values: Iterable<string>): string =>
    Array.from(new Set(values))
        .sort((a, b) => a.localeCompare(b, 'en'))
        .map((value) => JSON.stringify(value).replaceAll('"', "'"))
        .join(' | ');

const generatedDir = join(__dirname, '../src/__generated__');
mkdirSync(generatedDir, { recursive: true });

writeFileSync(
    join(generatedDir, 'unions.ts'),
    `/* (c) Copyright Frontify Ltd., all rights reserved. */
/* @generated by scripts/generateData.ts — do not edit by hand. */

/** Release statuses present in the bundled component data. */
export type ComponentStatus = ${unionOf(components.map((component) => component.status))};

/** Component categories present in the bundled data (icons are under 'icon'). */
export type ComponentCategory = ${unionOf(components.map((component) => component.category))};

/** Token categories present in the bundled data. */
export type TokenCategory = ${unionOf(tokens.map((token) => token.category))};
`,
);

writeFileSync(
    join(generatedDir, 'data.ts'),
    `/* (c) Copyright Frontify Ltd., all rights reserved. */
/* @generated by scripts/generateData.ts — do not edit by hand. */

import { type ComponentDetails } from '../types/components';
import { type Guide } from '../types/guides';
import { type Token, type TokenUtility } from '../types/tokens';

export const components: readonly ComponentDetails[] = ${stringify(components)};
export const tokens: readonly Token[] = ${stringify(tokens)};
export const tokenUtilities: readonly TokenUtility[] = ${stringify(tokenUtilities)};
export const guides: readonly Guide[] = ${stringify(guides)};
`,
);

console.log(
    `✓ ${realComponents.length} components + ${iconComponents.length} icons, ` +
        `${tokens.length} tokens, ${tokenUtilities.length} utilities, ` +
        `${guides.length} guides`,
);
