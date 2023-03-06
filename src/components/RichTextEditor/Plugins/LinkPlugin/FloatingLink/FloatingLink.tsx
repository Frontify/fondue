/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    FloatingLinkProps,
    FloatingLink as PlateFloatingLink,
    createComponentAs,
    createElementAs,
} from '@udecode/plate';
import { useFloatingLinkEdit } from './EditLinkModal';
import { useFloatingLinkInsert } from './InsertLinkModal/useFloatingLinkInsert';

const FloatingLinkInsertRoot = createComponentAs<FloatingLinkProps>((props) => {
    const htmlProps = useFloatingLinkInsert({
        ...props,
        floatingOptions: {
            strategy: 'fixed',
        },
    });

    if (htmlProps.style?.display === 'none') {
        return null;
    }

    return createElementAs('div', htmlProps);
});

const FloatingLinkEditRoot = createComponentAs<FloatingLinkProps>((props) => {
    const htmlProps = useFloatingLinkEdit({
        ...props,
        floatingOptions: {
            strategy: 'fixed',
        },
    });

    if (htmlProps.style?.display === 'none') {
        return null;
    }

    return createElementAs('div', htmlProps);
});

PlateFloatingLink.EditRoot = FloatingLinkEditRoot;
PlateFloatingLink.InsertRoot = FloatingLinkInsertRoot;

export const FloatingLink = PlateFloatingLink;
