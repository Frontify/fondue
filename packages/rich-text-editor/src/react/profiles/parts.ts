/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPlugin } from '#/bridge/plugin';
import { type FeaturePolicy } from '#/runtime/types';

import { type ShippedParts } from '../compile-editor';
import { type CompiledEditorDefinition, type ReactPresentation } from '../types';

/** The editor parts by feature ID, which a profile's definition installs and nothing else. */
export const partsOf = (parts: readonly EditorPlugin[]): ShippedParts =>
    Object.fromEntries(parts.map((part) => [part.feature, part]));

/** A feature the profile loads but lets no author create: stored content stays editable, and paste drops it. */
export const NOT_CREATABLE: FeaturePolicy = { create: false, edit: true, remove: true, paste: false };

/** A shipped profile's definition and its default presentation. */
export interface ShippedProfile {
    readonly definition: CompiledEditorDefinition<object>;
    readonly presentation: ReactPresentation;
    /** The default presentation on a touch device, whose toolbar starts with undo and redo. */
    readonly touchPresentation?: ReactPresentation;
}
