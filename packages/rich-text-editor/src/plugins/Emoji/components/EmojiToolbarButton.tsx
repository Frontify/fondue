/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import { IconFaceHappy } from '@frontify/fondue-icons';
import { type ReactNode, useId, useRef, useState } from 'react';

import { type EditorControlApi } from '#/core';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import { ToolbarButton } from '../../shared/ToolbarButton/ToolbarButton';
import { type EmojiItem } from '../types';

import { EmojiPicker } from './EmojiPicker';

/** The toolbar entry point: the picker in a flyout, inserting the emoji at the caret as text. */
export const EmojiToolbarButton = ({
    api,
    emojis,
}: {
    api: EditorControlApi;
    emojis: readonly EmojiItem[];
}): ReactNode => {
    const [open, setOpen] = useState(false);
    const titleId = useId();
    const searchRef = useRef<HTMLInputElement>(null);

    const { returnToText, contentProps } = useFocusAfterClose(api);
    const close = (): void => {
        returnToText();
        setOpen(false);
    };

    return (
        <Flyout.Root open={open} onOpenChange={setOpen}>
            <Flyout.Trigger>
                <ToolbarButton title="Emoji">
                    <IconFaceHappy size={16} />
                </ToolbarButton>
            </Flyout.Trigger>
            <Flyout.Content
                {...contentProps}
                side="bottom"
                align="start"
                width="336px"
                aria-labelledby={titleId}
                onEscapeKeyDown={returnToText}
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    searchRef.current?.focus();
                }}
            >
                <Flyout.Header>
                    <span id={titleId}>Emoji</span>
                </Flyout.Header>
                <Flyout.Body>
                    <EmojiPicker
                        emojis={emojis}
                        searchRef={searchRef}
                        onPick={(item) => {
                            // The editor keeps its selection while the flyout has focus: the emoji goes where the caret was.
                            api.insertText(item.emoji);
                            close();
                        }}
                    />
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};
