/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { useEffect, useRef, useState } from 'react';

import { type EditorApi, useEditorOverlay } from '#/bridge/pluginApi/plugin';

import { CLEAR_COLOR, type ColorMark, type ColorMenuOptions, type ColorMenuStrings } from '../helpers/colorMenuModel';

import { SwatchGroup } from './SwatchGroup';

export type SwatchesProps = {
    api: EditorApi;
    options: ColorMenuOptions;
    strings: ColorMenuStrings;
    testId: string;
    onCustom: (mark: ColorMark) => void;
    onClose: () => void;
};

/**
 * Names the hidden trigger of a virtually anchored menu, whose `aria-labelledby` on the content names the menu over
 * its `aria-label`.
 */
const nameTrigger = (content: HTMLElement | null, label: string) => {
    const triggerId = content?.getAttribute('aria-labelledby');
    if (content === null || triggerId === null || triggerId === undefined) {
        return;
    }

    const root = content.getRootNode() as Document | ShadowRoot;
    root.getElementById(triggerId)?.setAttribute('aria-label', label);
};

/** The swatches of the colour menu, focusing the checked one on open, else the first. */
export const Swatches = ({ api, options, strings, testId, onCustom, onClose }: SwatchesProps) => {
    const [open, setOpen] = useState(true);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };

    const overlay = useEditorOverlay(open, close);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const content = contentRef.current;
            if (content === null) {
                return;
            }

            let target = content.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]');
            if (target === null) {
                target = content.querySelector<HTMLElement>('[role^="menuitem"]');
            }

            target?.focus();
        });

        return () => cancelAnimationFrame(frame);
    }, []);

    const run = (command: string, payload?: object) => {
        // The command moves focus to the editor first, which the overlay reads as a move that keeps the menu open.
        close(false);
        api.commands.execute(command, payload, { focus: 'editor' });
    };

    const groups: { mark: ColorMark; heading: string; custom: string }[] = [
        { mark: 'font_color', heading: strings.textColors, custom: strings.customText },
    ];
    if (options.highlight) {
        groups.push({ mark: 'highlight', heading: strings.highlightColors, custom: strings.customHighlight });
    }

    return (
        <Dropdown.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Dropdown.Content
                ref={(element) => {
                    contentRef.current = element;
                    overlay.contentRef(element);
                    nameTrigger(element, strings.label);
                }}
                aria-label={strings.label}
                container={overlay.container}
                data-test-id={`${testId}-color-menu`}
            >
                {groups.map((group) => (
                    <SwatchGroup
                        key={group.mark}
                        api={api}
                        mark={group.mark}
                        heading={group.heading}
                        custom={group.custom}
                        tokens={options.tokens}
                        literalMarks={options.literal}
                        run={run}
                        onCustom={onCustom}
                    />
                ))}
                <Dropdown.Item onSelect={() => run(CLEAR_COLOR)}>{strings.clear}</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    );
};

Swatches.displayName = 'Swatches';
