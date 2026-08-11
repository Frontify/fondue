/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import { IconLink } from '@frontify/fondue-icons';
import { type ReactNode, useState } from 'react';

import { type EditorControlApi } from '#/RichTextEditor';

import { ToolbarButton } from '../../shared/ToolbarButton/ToolbarButton';
import { type LinkDraft, readSelection } from '../helpers/draft';

import { LinkForm } from './LinkForm';

/**
 * The toolbar's way in: the same form, hung off a button, for turning selected
 * text into a link (or for reaching a link from the keyboard).
 */
export const LinkFlyout = ({ api }: { api: EditorControlApi }): ReactNode => {
    const active = 'link' in api.selection.get().marks;
    // The draft is both the form's starting point and whether it is open at all:
    // there is no such thing as an open form without one.
    const [draft, setDraft] = useState<LinkDraft | null>(null);
    const title = active ? 'Edit link' : 'Add link';

    // The flyout hands focus back to its own trigger as it closes, which would
    // undo the focus the mark commands already restored.
    const close = (): void => {
        setDraft(null);
        requestAnimationFrame(() => api.focus());
    };

    return (
        <Flyout.Root open={draft !== null} onOpenChange={(next) => (next ? setDraft(readSelection(api)) : close())}>
            <Flyout.Trigger>
                <ToolbarButton active={active} title={title}>
                    <IconLink size={16} />
                </ToolbarButton>
            </Flyout.Trigger>
            <Flyout.Content
                width="280px"
                // The form knows which of its fields still needs filling.
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                <Flyout.Header showCloseButton>{title}</Flyout.Header>
                <Flyout.Body>
                    {draft ? <LinkForm api={api} initial={draft} existing={active} onDone={close} /> : null}
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};
