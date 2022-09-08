import {
    FloatingLinkEditButton,
    FloatingLinkEditRoot,
    FloatingLinkProps,
    OpenLinkButton,
    UnlinkButton,
    createComponentAs,
    createElementAs,
} from '@udecode/plate';
import { FloatingLinkTextInput } from './FloatingLinkTextInput';
import { FloatingLinkUrlInput } from './FloatingLinkUrlInput';
import { useFloatingLinkInsert } from './useFloatingInsert';

const FloatingLinkInsertRoot = createComponentAs<FloatingLinkProps>((props) => {
    const htmlProps = useFloatingLinkInsert(props);

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
