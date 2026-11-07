/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import { IconLink } from '@frontify/fondue-icons';
import { type ReactNode, useEffect, useId, useState } from 'react';

import { type ToolbarItemProps } from '#/core';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import { ToolbarButton } from '../../shared/ToolbarButton/ToolbarButton';
import { type LinkSearch } from '../helpers/destination';
import { registerNewLinkForm } from '../helpers/newLinkForms';
import { type LinkPolicy } from '../helpers/policy';

import { LinkTargetForm } from './LinkTargetForm';

/**
 * The toolbar entry point. On a link it opens the link's own editor; on plain
 * selected text it opens a form of its own, and the text becomes a link only on
 * save, so the document never holds a link without a target.
 */
export const LinkToolbarButton = ({
    api,
    selectedNode,
    selection,
    toggle,
    openEditor,
    shortcut,
    policy,
    search,
}: ToolbarItemProps & { shortcut: string; policy: LinkPolicy; search?: LinkSearch }): ReactNode => {
    const inLink = selectedNode !== null;
    const [creating, setCreating] = useState(false);
    const titleId = useId();

    useEffect(() => registerNewLinkForm(api, () => setCreating(true)), [api]);

    const { returnToText, contentProps } = useFocusAfterClose(api);
    const finish = (): void => {
        returnToText();
        setCreating(false);
    };

    return (
        <Flyout.Root
            open={creating}
            onOpenChange={(open) => {
                if (!open) {
                    setCreating(false);
                } else if (inLink) {
                    openEditor();
                } else {
                    setCreating(true);
                }
            }}
        >
            <Flyout.Trigger>
                <ToolbarButton title={inLink ? 'Edit link' : 'Add link'} shortcut={shortcut} active={inLink}>
                    <IconLink size={16} />
                </ToolbarButton>
            </Flyout.Trigger>
            <Flyout.Content
                {...contentProps}
                side="bottom"
                align="start"
                aria-labelledby={titleId}
                onEscapeKeyDown={finish}
                // The form focuses its own field.
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                <Flyout.Header>
                    <span id={titleId}>Add link</span>
                </Flyout.Header>
                <Flyout.Body>
                    <LinkTargetForm
                        initial={{ href: '' }}
                        initialText={selection.text}
                        policy={policy}
                        search={search}
                        onSave={(value, text = '') => {
                            if (text === selection.text && !selection.isCollapsed) {
                                // Formatting inside the selection survives.
                                toggle(value);
                            } else {
                                api.insertText(text === '' ? value.href : text, { link: value });
                            }
                            finish();
                        }}
                        onCancel={finish}
                    />
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};
