import { HTMLPropsAs, createComponentAs, createElementAs } from '@udecode/plate-core';
import { UseVirtualFloatingOptions } from '@udecode/plate-floating';
import { FloatingButtonEditButton } from './FloatingButtonEditButton';
import { FloatingButtonNewTabInput } from './FloatingButtonNewTabInput';
import { FloatingButtonTextInput } from './FloatingButtonTextInput';
import { FloatingButtonUrlInput } from './FloatingButtonUrlInput';
import { OpenButtonButton } from './OpenButtonButton';
import { UnlinkButton } from './UnlinkButton';
import { useFloatingButtonEdit } from './useFloatingButtonEdit';
import { useFloatingButtonInsert } from './useFloatingButtonInsert';

export type FloatingButtonProps = HTMLPropsAs<'div'> & {
    floatingOptions?: UseVirtualFloatingOptions;
};

export const FloatingButtonEditRoot = createComponentAs<FloatingButtonProps>((props) => {
    const htmlProps = useFloatingButtonEdit(props);

    if (htmlProps.style?.display === 'none') {
        return null;
    }

    return createElementAs('div', htmlProps);
});

export const FloatingButtonInsertRoot = createComponentAs<FloatingButtonProps>((props) => {
    const htmlProps = useFloatingButtonInsert(props);

    if (htmlProps.style?.display === 'none') {
        return null;
    }
    return createElementAs('div', htmlProps);
});

export const FloatingButton = {
    EditRoot: FloatingButtonEditRoot,
    InsertRoot: FloatingButtonInsertRoot,
    UrlInput: FloatingButtonUrlInput,
    TextInput: FloatingButtonTextInput,
    NewTabInput: FloatingButtonNewTabInput,
    EditButton: FloatingButtonEditButton,
    UnlinkButton,
    OpenLinkButton: OpenButtonButton,
};
