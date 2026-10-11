/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mentionLabel, unavailableNote } from '#/model/references';
import { type ReaderNodeProps, type ReaderRenderers } from '#/reader/define';

/** `@` and the label isolated for bidirectional text, then the unavailable note, with no resource ID in the markup. */
const Mention = ({ attrs, context }: ReaderNodeProps) => {
    const shown = mentionLabel(attrs, context);
    const note = unavailableNote(shown, context.t);
    return (
        <span data-mention="">
            @<bdi>{shown.label}</bdi>
            {note !== '' && note}
        </span>
    );
};

export const mentionReader: ReaderRenderers = { mention: Mention };
