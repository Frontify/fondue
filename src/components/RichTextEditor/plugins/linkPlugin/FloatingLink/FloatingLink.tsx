import {
    createComponentAs,
    createElementAs,
    FloatingLinkEditButton,
    FloatingLinkProps,
    OpenLinkButton,
    UnlinkButton,
} from '@udecode/plate';
import { FloatingLinkTextInput } from './FloatingLinkTextInput';
import { FloatingLinkUrlInput } from './FloatingLinkUrlInput';
import { useFloatingLinkEdit } from './useFloatingLinkEdit';
import { useFloatingLinkInsert } from './useFloatingLinkInsert';

const FloatingLinkInsertRoot = createComponentAs<FloatingLinkProps>((props) => {
    const htmlProps = useFloatingLinkInsert(props);

    if (htmlProps.style?.display === 'none') {
        return null;
    }

    return createElementAs('div', htmlProps);
});

export const FloatingLinkEditRoot = createComponentAs<FloatingLinkProps>((props) => {
    const htmlProps = useFloatingLinkEdit(props);

    if (htmlProps.style?.display === 'none') {
        return null;
    }

    return createElementAs('div', htmlProps);
});

export const FloatingLink = {
    EditRoot: FloatingLinkEditRoot,
    InsertRoot: FloatingLinkInsertRoot,
    UrlInput: FloatingLinkUrlInput,
    TextInput: FloatingLinkTextInput,
    EditButton: FloatingLinkEditButton,
    UnlinkButton,
    OpenLinkButton,
};
