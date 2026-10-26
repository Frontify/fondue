/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { type Announcer, AnnouncerContext } from '../helpers/announcer';

/** Announces through the live region of the editor around the caller. */
export const useAnnounce = (): Announcer['announce'] => {
    const announcer = useContext(AnnouncerContext);
    if (announcer === null) {
        throw new Error('useAnnounce must be called inside RichTextEditor.Root.');
    }

    return announcer.announce;
};
