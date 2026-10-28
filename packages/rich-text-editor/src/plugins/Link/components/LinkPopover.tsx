/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Flyout } from '@frontify/fondue-components';
import { useId } from 'react';

import { type OverlayProps } from '#/bridge/pluginApi/plugin';

import { type LinkInitial } from '../helpers/linkPopoverModel';
import { useLinkPopoverState } from '../hooks/useLinkPopoverState';

import { LinkForm } from './LinkForm';

export {
    type LinkInitial,
    linkInitialOf,
    type LinkPopoverStrings,
    linkPopoverStrings,
    type LinkStyleOption,
    linkStylesOf,
    SET_LINK,
} from '../helpers/linkPopoverModel';

export type LinkPopoverProps = OverlayProps & { initial: LinkInitial };

/**
 * The link popover: a non-modal `Flyout` on the link or the selection with the destination, the visible text, "Open in
 * new window" and, when the presentation has link styles, a Style select, prefilled from the link at the selection.
 * Apply runs `link.set` at the target captured on open; a destination with no scheme that names a host gets `https://`,
 * and one that fails the URL check keeps the popover open with the error on the field. When the linked text was removed
 * meanwhile, Insert as new link inserts the visible text as a linked run at the selection. With `search`, typing in the
 * destination lists matching internal destinations that carry a checked `href`; picking one links to it.
 */
export const LinkPopover = (props: LinkPopoverProps) => {
    const state = useLinkPopoverState(props);
    const destinationId = useId();
    const textId = useId();
    const newWindowId = useId();
    const errorId = useId();
    const removedId = useId();
    const formId = useId();
    const { initial, strings, testId, overlay, open, dismiss, anchor, destinationRef, textRef } = state;

    return (
        <Flyout.Root open={open} onOpenChange={dismiss} virtualAnchor={anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                // Radix gives the content `role="dialog"`, which `Flyout` passes this name to.
                aria-label={strings.title}
                container={overlay.container}
                side="bottom"
                align="start"
                width="320px"
                data-test-id={`${testId}-link-popover`}
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    (initial.focus === 'text' ? textRef : destinationRef).current?.focus();
                }}
            >
                <Flyout.Body>
                    <LinkForm
                        state={state}
                        destinationId={destinationId}
                        textId={textId}
                        newWindowId={newWindowId}
                        errorId={errorId}
                        removedId={removedId}
                        formId={formId}
                    />
                </Flyout.Body>
                <Flyout.Footer>
                    <Button type="submit" form={formId} emphasis="strong">
                        {strings.apply}
                    </Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};

LinkPopover.displayName = 'LinkPopover';
