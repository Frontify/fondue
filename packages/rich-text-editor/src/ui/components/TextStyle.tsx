/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dropdown } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { useContext, useRef } from 'react';

import { keepFocus } from '#/bridge/chrome/helpers/keepFocus';
import { useOverlayContainer } from '#/bridge/overlays/hooks/useOverlayContainer';
import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { useSessionValue } from '#/bridge/session/hooks/useSessionValue';
import { isRecord } from '#/model';
import { type EditorPort } from '#/runtime/port';
import { blockTypeOf } from '#/ui/helpers/blockTypeOf';
import { tabStop, type ToolbarItem } from '#/ui/helpers/items';
import styles from '#/ui/styles/toolbar.module.scss';

import { TextStyleRow } from './TextStyleRow';

type Row = NonNullable<ToolbarItem['options']>[number];

type TextStyleProps = {
    item: ToolbarItem;
    disabled: boolean;
    keepsFocus: boolean;
    outOfTabOrder: boolean;
};

/** The index in `rows` of the row whose command is active, preferring one other than `fallback`, or -1. */
const activeIn = (session: EditorPort | undefined, rows: readonly Row[], fallback: (row: Row) => boolean) => {
    if (session === undefined) {
        return -1;
    }

    const held = rows.filter(({ command, payload }) => session.handle.query(command, payload).active === true);
    const named = held.find((row) => !fallback(row)) ?? held[0];
    if (named === undefined) {
        return -1;
    }

    return rows.indexOf(named);
};

/**
 * The text style picker: its trigger names the active block type, a stored heading level the policy cannot create
 * included, and its rows set the block types the author may create, then the brand styles that apply to the block
 * type at the selection, each previewing its font.
 */
export const TextStyle = ({ item, disabled, keepsFocus, outOfTabOrder }: TextStyleProps) => {
    const runtime = useContext(SessionContext);
    const container = useOverlayContainer();
    const contentRef = useRef<HTMLDivElement>(null);
    // A row that ran its command sends focus to the surface rather than back to the trigger.
    const ranRef = useRef(false);
    const options = item.options ?? [];
    const types = options.filter(({ brand }) => brand === undefined);
    const blockType = useSessionValue(blockTypeOf, Object.is);
    const brands = options.filter(({ brand }) => brand !== undefined && brand.appliesTo.includes(blockType));
    // A paragraph inside a quote shows Quote, the type it holds the paragraph in.
    const active = useSessionValue(
        (session) => activeIn(session, types, ({ command }) => command === 'paragraph.set'),
        Object.is,
    );
    // A block with a brand style checks its row over the default style's.
    const brandActive = useSessionValue(
        (session) => activeIn(session, brands, ({ payload }) => isRecord(payload) && payload.styleId === null),
        Object.is,
    );
    let label = item.label;
    const shown = types[active];
    if (shown !== undefined) {
        label = shown.label;
    }

    let onMouseDown: typeof keepFocus | undefined;
    if (keepsFocus) {
        onMouseDown = keepFocus;
    }

    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <RadixToolbar.Button
                    asChild
                    {...tabStop(outOfTabOrder)}
                    className={`${styles.item} ${styles.picker}`}
                    disabled={disabled}
                    data-rte-toolbar-item=""
                    data-group-start={item.groupStart || undefined}
                    onMouseDown={onMouseDown}
                >
                    <Button size="small" emphasis="weak">
                        {label}
                    </Button>
                </RadixToolbar.Button>
            </Dropdown.Trigger>
            <Dropdown.Content
                ref={contentRef}
                container={container}
                onCloseAutoFocus={(event) => {
                    if (ranRef.current) {
                        event.preventDefault();
                        ranRef.current = false;
                    }
                }}
            >
                {types
                    .filter(({ offered }) => offered)
                    .map((option) => (
                        <TextStyleRow
                            key={option.key}
                            option={option}
                            checked={option === shown}
                            runtime={runtime}
                            contentRef={contentRef}
                            ranRef={ranRef}
                        />
                    ))}
                {brands.length > 0 && (
                    <Dropdown.Group heading={item.groupLabel ?? ''}>
                        {brands.map((option, index) => (
                            <TextStyleRow
                                key={option.key}
                                option={option}
                                checked={index === brandActive}
                                runtime={runtime}
                                contentRef={contentRef}
                                ranRef={ranRef}
                            />
                        ))}
                    </Dropdown.Group>
                )}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};

TextStyle.displayName = 'TextStyle';
