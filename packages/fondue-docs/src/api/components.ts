/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ComponentDetails,
    type ComponentFacetNode,
    type ComponentFilter,
    type ComponentNode,
} from '../types/components';
import { pushToMultiMap, sortedByName } from '../utils/collections';
import { textIncludes, toArray } from '../utils/filters';
import { makeFacet } from '../utils/makeFacet';

export interface ComponentsApi {
    list(): readonly ComponentNode[];
    get(name: string): ComponentNode | undefined;
    has(name: string): boolean;
    where(filter: ComponentFilter): readonly ComponentNode[];
    readonly size: number;

    categories(): readonly ComponentFacetNode[];
    category(name: string): ComponentFacetNode | undefined;
    tags(): readonly ComponentFacetNode[];
    tag(name: string): ComponentFacetNode | undefined;
    statuses(): readonly ComponentFacetNode[];
    status(name: string): ComponentFacetNode | undefined;
}

const matches = (raw: ComponentDetails, filter: ComponentFilter): boolean => {
    const categories = toArray(filter.category);
    const statuses = toArray(filter.status);
    const tags = toArray(filter.tag);
    if (categories && !categories.includes(raw.category)) {
        return false;
    }
    if (statuses && !statuses.includes(raw.status)) {
        return false;
    }
    if (tags && !tags.some((t) => raw.tags.includes(t))) {
        return false;
    }
    if (filter.text && !textIncludes(filter.text, [raw.name, raw.description, raw.category, ...raw.tags])) {
        return false;
    }
    return true;
};

export const buildComponentsApi = (raws: readonly ComponentDetails[]): ComponentsApi => {
    const categoryMembers = new Map<string, string[]>();
    const statusMembers = new Map<string, string[]>();
    const tagMembers = new Map<string, string[]>();
    for (const raw of raws) {
        if (raw.category) {
            pushToMultiMap(categoryMembers, raw.category, raw.name);
        }
        if (raw.status) {
            pushToMultiMap(statusMembers, raw.status, raw.name);
        }
        for (const tag of raw.tags) {
            pushToMultiMap(tagMembers, tag, raw.name);
        }
    }

    // nodes is filled below — facets close over the in-progress map.
    const nodes = new Map<string, ComponentNode>();
    const resolve = (name: string): ComponentNode | undefined => nodes.get(name);
    const matchNode = (node: ComponentNode, f: ComponentFilter): boolean => matches(node.toJSON(), f);

    const facets = (memberships: Map<string, string[]>): Map<string, ComponentFacetNode> =>
        new Map(Array.from(memberships, ([name, ids]) => [name, makeFacet(name, ids, resolve, matchNode)]));

    const categories = facets(categoryMembers);
    const statuses = facets(statusMembers);
    const tags = facets(tagMembers);

    for (const raw of raws) {
        nodes.set(raw.name, {
            name: raw.name,
            description: raw.description,
            importStatement: raw.importStatement,
            instructions: raw.instructions,
            props: raw.props,
            subComponents: raw.subComponents,
            examples: raw.examples,
            typeDefinitions: raw.typeDefinitions,
            category: () => {
                const node = categories.get(raw.category);
                if (!node) {
                    throw new Error(`Unknown category "${raw.category}" on "${raw.name}"`);
                }
                return node;
            },
            status: () => {
                const node = statuses.get(raw.status);
                if (!node) {
                    throw new Error(`Unknown status "${raw.status}" on "${raw.name}"`);
                }
                return node;
            },
            tags: () => raw.tags.map((t) => tags.get(t)).filter((n): n is ComponentFacetNode => !!n),
            related: () => raw.relatedComponents.map(resolve).filter((n): n is ComponentNode => !!n),
            toJSON: () => raw,
        });
    }

    const all = Array.from(nodes.values());

    return {
        list: () => all,
        get: (name) => nodes.get(name),
        has: (name) => nodes.has(name),
        where: (f) => all.filter((n) => matchNode(n, f)),
        get size() {
            return all.length;
        },
        categories: () => sortedByName(categories.values()),
        category: (name) => categories.get(name),
        tags: () => sortedByName(tags.values()),
        tag: (name) => tags.get(name),
        statuses: () => sortedByName(statuses.values()),
        status: (name) => statuses.get(name),
    };
};
