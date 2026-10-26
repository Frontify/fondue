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
    readonly id: string;
    readonly version: number;
    readonly declaration: FeatureDeclaration;
    /** Every declared option, defaulted. */
    readonly options: JsonObject;
};
export type SharedAttribute = {
    readonly name: string;
    readonly featureId: string;
    readonly declaration: SharedAttributeDeclaration;
};
export type CompiledNode = {
    readonly name: string;
    readonly featureId: string;
    readonly declaration: NodeDeclaration;
    /** Attributes other features add, in feature order. */
    readonly shared: readonly SharedAttribute[];
};
export type CompiledMark = {
    readonly name: string;
    readonly featureId: string;
    readonly declaration: MarkDeclaration;
};
/** A feature's function parse rule, whose answers meet the declarations of its mark or node as a tag rule's do. */
export type CompiledParseRule = {
    readonly tag: string;
    readonly kind: 'mark' | 'node';
    /** The mark or node it reads. */
    readonly name: string;
    /** The checked attributes, `null` when the element is not one, or `undefined` for an answer decode would reject. */
    readonly read: (element: HTMLElement) => Record<string, unknown> | null | undefined;
};
/** What the definition compiler and later layers read from a content model. */
export type CompiledModel = {
    readonly features: readonly CompiledFeature[];
    /** In the model's declared order. */
    readonly nodes: readonly CompiledNode[];
    /** By rank, lowest outermost, then in declared order. */
    readonly marks: readonly CompiledMark[];
    readonly plugins: readonly PluginDescriptor[];
    readonly migrations: readonly ModelMigration[];
    /** In feature order, for every reader of pasted or imported HTML. */
    readonly parseRules: readonly CompiledParseRule[];
};
