/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Loads the component manifests from @frontify/fondue-components and
 * @frontify/fondue-icons and normalizes them into the SDK component shape.
 *
 * Icons are synthesized into the components list here so the runtime API has
 * only one entity kind to deal with. Fields that are "not applicable" are
 * normalized to `null` (never the empty string).
 */

import { createRequire } from 'node:module';

import { duplicateErrors } from './utils';

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

/** The normalized component shape emitted into data.ts ('' sentinels become null). */
interface SdkProp extends Omit<RawProp, 'deprecationMessage'> {
    deprecationMessage: string | null;
}

export interface SdkComponent {
    id: string;
    name: string;
    description: string;
    status: string;
    category: string;
    tags: string[];
    relatedComponents: string[];
    importStatement: string;
    instructions: string | null;
    props: SdkProp[];
    subComponents: { name: string; props: SdkProp[] }[];
    examples: unknown[];
    typeDefinitions: Record<string, string>;
}

const require = createRequire(import.meta.url);

// The public contract uses `null` for "not applicable" — never ''.
const normalizeProp = (prop: RawProp): SdkProp => ({
    ...prop,
    deprecationMessage: prop.deprecationMessage || null,
});

const loadRealComponents = (): SdkComponent[] => {
    const componentsIndex = require('@frontify/fondue-components/manifests/manifest') as {
        components: Record<string, ComponentIndexEntry>;
    };
    return Object.values(componentsIndex.components).map((entry): SdkComponent => {
        const stem = entry.manifestPath.replace(/\.json$/i, '');
        const detail = require(`@frontify/fondue-components/manifests/${stem}`) as RawComponentDetail;
        return {
            id: detail.name,
            name: detail.name,
            description: detail.description,
            status: detail.status,
            category: detail.category,
            tags: detail.tags,
            relatedComponents: detail.relatedComponents,
            importStatement: detail.importStatement,
            instructions: detail.instructions || null,
            props: detail.props.map(normalizeProp),
            subComponents: detail.subComponents.map((sub) => ({ ...sub, props: sub.props.map(normalizeProp) })),
            examples: detail.examples,
            typeDefinitions: detail.typeDefinitions,
        };
    });
};

const loadIconComponents = (): SdkComponent[] => {
    const icons = require('@frontify/fondue-icons/manifest.json') as { icons: IconEntry[] };
    return icons.icons.map((icon): SdkComponent => ({
        id: icon.componentName,
        name: icon.componentName,
        description: icon.description,
        status: 'released',
        category: 'icon',
        tags: icon.tags,
        relatedComponents: [],
        importStatement: icon.importStatement,
        instructions: null,
        props: [],
        subComponents: [],
        examples: icon.examples,
        typeDefinitions: {},
    }));
};

const validateComponents = (components: readonly SdkComponent[]): string[] => {
    const errors = duplicateErrors(
        'component name',
        components.map((component) => component.name),
    );
    const componentNames = new Set(components.map((component) => component.name));
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
    return errors;
};

export interface GeneratedComponents {
    components: SdkComponent[];
    realCount: number;
    iconCount: number;
    errors: string[];
}

export const generateComponents = (): GeneratedComponents => {
    const realComponents = loadRealComponents();
    const iconComponents = loadIconComponents();
    const components = [...realComponents, ...iconComponents];
    return {
        components,
        realCount: realComponents.length,
        iconCount: iconComponents.length,
        errors: validateComponents(components),
    };
};
