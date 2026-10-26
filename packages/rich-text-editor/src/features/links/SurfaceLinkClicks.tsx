/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';

import { useApplePlatform, useEditorApi } from '#/bridge/plugin';

import { openLink } from './linkBubbleModel';

/** A link in the surface never navigates the page while it is edited; it loads with the editor, not with the lazy bubble. */
export const SurfaceLinkClicks = () => {
    const api = useEditorApi();
    const apple = useApplePlatform();
    useEffect(() => {
        const surface = api?.surface();
        if (api === undefined || surface === undefined) {
            return undefined;
        }
        // Mod+click opens it in a new tab, and in a read-only surface a plain click follows it as the reader's link does.
        const onClick = (event: MouseEvent) => {
            const element = event.target instanceof Element ? event.target.closest('a[href]') : null;
            if (element === null || !surface.contains(element) || event.button !== 0) {
                return;
            }
            const clicked = api.marks.run('link', { at: element });
            const modified = apple ? event.metaKey : event.ctrlKey;
            const editable = api.editable();
            if (!editable && !modified && clicked?.attrs.openInNewWindow !== true) {
                return;
            }
            event.preventDefault();
            if (modified || !editable) {
                openLink(surface.ownerDocument.defaultView, clicked?.attrs.href);
            }
        };
        surface.addEventListener('click', onClick);
        return () => surface.removeEventListener('click', onClick);
    }, [api, apple]);
    return null;
};
