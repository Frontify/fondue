/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { type RefObject } from 'react';

import { ChromeBoundary, NO_ATTRS } from '#/bridge/PortalHost';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';

import { MoreRow } from './MoreRow';

/** The More menu's content, which loads with the toolbar's More so the editor's initial load holds none of it. */
export const MoreContent = ({
    contentRef,
    container,
    items,
    strings,
    blockType,
    modeLabel,
    onRun,
    onCloseAutoFocus,
    onModeSwitch,
}: {
    contentRef: RefObject<HTMLDivElement>;
    container: HTMLElement | null;
    items: readonly ToolbarItem[];
    strings: ToolbarStrings;
    blockType: string;
    modeLabel: string;
    onRun: (item: ToolbarItem) => Promise<void>;
    onCloseAutoFocus: (event: Event) => void;
    onModeSwitch: () => void;
}) => (
    <Dropdown.Content ref={contentRef} container={container} onCloseAutoFocus={onCloseAutoFocus}>
        {/* The text style picker that does not fit offers its rows here. */}
        {items
            .flatMap((item) => {
                if (item.options === undefined) {
                    return [item];
                }

                // A brand style row applies only to the block types its style names.
                return item.options.filter(
                    ({ offered, brand }) => offered && (brand === undefined || brand.appliesTo.includes(blockType)),
                );
            })
            .map((item) => (
                // A row that throws leaves only its own place empty.
                <ChromeBoundary key={item.key} message="" attrs={NO_ATTRS}>
                    <MoreRow item={item} strings={strings} onRun={onRun} />
                </ChromeBoundary>
            ))}
        <Dropdown.Item onSelect={onModeSwitch}>{modeLabel}</Dropdown.Item>
    </Dropdown.Content>
);
