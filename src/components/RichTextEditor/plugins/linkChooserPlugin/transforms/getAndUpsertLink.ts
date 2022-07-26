import { getAbove } from '@udecode/plate-common';
import { isCollapsed, PlateEditor } from '@udecode/plate-core';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ChosenLink } from '../types';
import { upsertLinkAtSelection } from './upsertLinkAtSelection';

const defaultChosenLink: ChosenLink = {
    searchResult: null,
    openInNewTab: false,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getAndUpsertLink = async <T = {}>(
    editor: PlateEditor<T>,
    getChosenLink: (prevLink: ChosenLink) => Promise<ChosenLink | void>,
) => {
    let prevChosenLink = { ...defaultChosenLink };

    const linkNode = getAbove(editor, {
        match: { type: ELEMENT_LINK },
    });

    // legacy link structure
    if (Array.isArray(linkNode) && linkNode[0].url) {
        const { url, children } = linkNode[0];

        prevChosenLink = {
            searchResult: {
                id: url,
                title: children[0].text,
                link: url,
                icon: 'LINK',
            },
            openInNewTab: false,
        };
    }

    // new link structure
    else if (linkNode && linkNode[0].chosenLink) {
        const { chosenLink, children } = linkNode[0];
        prevChosenLink = {
            searchResult: {
                ...chosenLink.searchResult,
                title: children[0].text,
            },
            openInNewTab: chosenLink.openInNewTab,
        };

        // no link existing
    } else {
        const selectionText = window.getSelection()?.toString();
        prevChosenLink = {
            searchResult: {
                id: '',
                title: selectionText ?? '',
                link: '',
                icon: '',
            },
            openInNewTab: false,
        };
    }

    const chosenLink = await getChosenLink(prevChosenLink);
    if (!chosenLink) {
        // Cancel Button was clicked
        return null;
    }

    // If our cursor is in middle of a link, then we don't want to insert it inline
    const shouldWrap: boolean = linkNode !== undefined && isCollapsed(editor.selection);
    upsertLinkAtSelection(editor, { chosenLink, wrap: shouldWrap });
};
