/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BalloonToolbar, usePlateEditorRef } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC, useEffect, useRef, useState } from 'react';
import { toolbarComponents } from './toolbarComponents';
import { ButtonGroupProps, ButtonGroupWidths, ToolbarProps } from './types';
import { defaultActions } from './utils/actions';
import { getButtonGroupWidthsPerRow } from './utils/toolbarCalc';

const ButtonGroup: FC<ButtonGroupProps> = ({ index, actions, editorId, textStyles, onLoaded, onClose }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const editor = usePlateEditorRef(editorId);

    useEffect(() => {
        onLoaded(index, ref.current?.clientWidth);

        return onClose();
    }, [ref.current?.clientWidth]);

    return (
        <div
            ref={ref}
            key={index}
            data-test-id={`toolbar-group-${index}`}
            className="tw-flex tw-items-center tw-h-12 tw-p-2"
        >
            {actions.map((action) => (
                <React.Fragment key={action}>{toolbarComponents(editor, editorId, textStyles)[action]}</React.Fragment>
            ))}
        </div>
    );
};

const DEFAULT_MAX_WIDTH = '100%';
const OFFSET_IN_PX = 12;

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles, actions = [] }) => {
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [buttonGroupsWidths, setButtonGroupsWidths] = useState<ButtonGroupWidths>([]);
    const [style, setStyle] = useState({ maxWidth: DEFAULT_MAX_WIDTH });
    const [toolbarWidth, setToolbarWidth] = useState<number>(0);

    const toolbarButtonGroups =
        buttonGroupsWidths.length === 0
            ? [toolbarActions.map((actions, index) => ({ actions, buttonGroupWidth: 0, index }))]
            : getButtonGroupWidthsPerRow(toolbarWidth, buttonGroupsWidths);

    useEffect(() => {
        if (!toolbarRef.current) {
            return;
        }
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                setTimeout(() => setToolbarWidth(entries[0].target.clientWidth), 0);
            }
        });
        if (toolbarRef.current) {
            resizeObserver.observe(toolbarRef.current);
        }

        /* setTimeout is required to prevent error "ResizeObserver loop limit exceeded" 
            from being thrown during cypress component tests */
        setTimeout(() => setToolbarWidth(toolbarRef.current?.clientWidth ?? 0), 0);

        return () => {
            toolbarRef.current && resizeObserver?.unobserve(toolbarRef.current);
        };
    }, [toolbarRef.current?.clientWidth]);

    useEffect(() => {
        const toolbarWidthSum =
            toolbarButtonGroups?.length &&
            Math.max(
                ...toolbarButtonGroups.map((element) =>
                    [...element, { actions: [], buttonGroupWidth: 0 }].reduce(
                        (prev, { buttonGroupWidth }) => prev + buttonGroupWidth,
                        0,
                    ),
                ),
            );

        setStyle({
            maxWidth:
                toolbarWidthSum !== 0
                    ? `${toolbarWidthSum + toolbarButtonGroups.length + OFFSET_IN_PX}px`
                    : DEFAULT_MAX_WIDTH,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonGroupsWidths]);

    return (
        <BalloonToolbar
            popperOptions={{
                modifiers: [
                    { name: 'offset', options: { offset: [0, OFFSET_IN_PX] } },
                    { name: 'flip', options: { fallbackPlacements: ['bottom', 'right'] } },
                ],
            }}
            styles={{ root: { border: 'none', background: '#ffffff' } }}
        >
            <div
                data-test-id="toolbar"
                style={style}
                className={merge([
                    'tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap',
                    style.maxWidth === DEFAULT_MAX_WIDTH && 'tw-invisible',
                ])}
                ref={toolbarRef}
            >
                {toolbarButtonGroups.map((row, index) => (
                    <div key={index} className="tw-divide-x tw-divide-line tw-flex tw-w-full tw-flex-wrap">
                        {row.map(({ actions, index }) => {
                            return (
                                <ButtonGroup
                                    key={index}
                                    actions={actions}
                                    index={index}
                                    textStyles={textStyles}
                                    editorId={editorId}
                                    onLoaded={(index, width) => {
                                        return setButtonGroupsWidths((state) => {
                                            const newState = [...state];
                                            newState[index] = { actions, buttonGroupWidth: width ?? 0, index };
                                            return newState;
                                        });
                                    }}
                                    onClose={() => setStyle({ maxWidth: DEFAULT_MAX_WIDTH })}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </BalloonToolbar>
    );
};
