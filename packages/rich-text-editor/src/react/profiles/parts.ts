/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FeaturePolicy } from '#/runtime/port';

import { type CompiledEditorDefinition, type ReactPresentation } from '../types';

/** A feature the profile loads but lets no author create: stored content stays editable, and paste drops it. */
export const NOT_CREATABLE: FeaturePolicy = { create: false, edit: true, remove: true, paste: false };

/** A shipped profile's definition and its default presentation. */
export type ShippedProfile = {
    definition: CompiledEditorDefinition<object>;
    presentation: ReactPresentation;
    /** The default presentation on a touch device, whose toolbar starts with undo and redo. */
    touchPresentation?: ReactPresentation;
};
