import { SearchResult } from '@components/LinkChooser';
import { ELEMENT_LINK, Value } from '@udecode/plate';
import { PlateEditor, getBlockAbove, isCollapsed } from '@udecode/plate-core';
import { ChosenLink } from '../types';
import { upsertLinkAtSelection } from './upsertLinkAtSelection';

const defaultChosenLink: ChosenLink = {
    searchResult: null,
    openInNewTab: false,
};

export const getAndUpsertLink = async (
    editor: PlateEditor<Value>,
    getChosenLink: (prevLink: ChosenLink) => Promise<ChosenLink | void>,
) => {
    let prevChosenLink = { ...defaultChosenLink };

    const linkNode = getBlockAbove(editor, {
        match: { type: ELEMENT_LINK },
    });

    // legacy link structure
    if (Array.isArray(linkNode) && linkNode[0].url) {
        const { url, children } = linkNode[0];

        prevChosenLink = {
            searchResult: {
                id: url as string,
                title: children[0].text as string,
                link: url as string,
                icon: 'LINK',
            },
            openInNewTab: false,
        };
    }

    // new link structure
    else if (linkNode && linkNode[0].chosenLink) {
        const { chooseLink, children } = linkNode[0];

        prevChosenLink = {
            searchResult: {
                ...((chooseLink as ChosenLink).searchResult as SearchResult),
                title: children[0].text as string,
            },
            openInNewTab: (chooseLink as ChosenLink).openInNewTab,
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
