/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginDescriptor } from './capabilities';
import {
    type FeatureDeclaration,
    type JsonObject,
    type MarkDeclaration,
    type ModelMigration,
    type NodeDeclaration,
    type SharedAttributeDeclaration,
} from './declarations';

export type CompiledFeature = {
    id: string;
    version: number;
    declaration: FeatureDeclaration;
    /** Every declared option, defaulted. */
    options: JsonObject;
};
export type SharedAttribute = {
    name: string;
    featureId: string;
    declaration: SharedAttributeDeclaration;
};
export type CompiledNode = {
    name: string;
    featureId: string;
    declaration: NodeDeclaration;
    /** Attributes other features add, in feature order. */
    shared: readonly SharedAttribute[];
};
export type CompiledMark = {
    name: string;
    featureId: string;
    declaration: MarkDeclaration;
};
/** A feature's function parse rule, whose answers meet the declarations of its mark or node as a tag rule's do. */
export type CompiledParseRule = {
    tag: string;
    kind: 'mark' | 'node';
    /** The mark or node it reads. */
    name: string;
    /** The checked attributes, `null` when the element is not one, or `undefined` for an answer decode would reject. */
    read: (element: HTMLElement) => Record<string, unknown> | null | undefined;
};
/** What the definition compiler and later layers read from a content model. */
export type CompiledModel = {
    features: readonly CompiledFeature[];
    /** In the model's declared order. */
    nodes: readonly CompiledNode[];
    /** By rank, lowest outermost, then in declared order. */
    marks: readonly CompiledMark[];
    plugins: readonly PluginDescriptor[];
    migrations: readonly ModelMigration[];
    /** In feature order, for every reader of pasted or imported HTML. */
    parseRules: readonly CompiledParseRule[];
};
