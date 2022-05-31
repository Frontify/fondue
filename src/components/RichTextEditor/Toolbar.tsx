/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BalloonToolbar, usePlateEditorRef } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC, useEffect, useRef, useState } from 'react';
import { toolbarComponents } from './toolbarComponents';
import { ButtonGroupProps, ToolbarProps } from './types';
import { defaultActions, EditorActions } from './utils/actions';

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
type ButtonGroupsWidths = { actions: EditorActions[]; buttonGroupWidth: number; index: number }[];
type ButtonGroupWidthsPerRow = ButtonGroupsWidths[];

const getButtonGroupWidthsPerRow = (toolbarWidth: number, buttonGroupsWidths: ButtonGroupsWidths) => {
    return buttonGroupsWidths.reduce((buttonGroupWidthsPerRow, { actions, buttonGroupWidth, index }) => {
        const rowCount = buttonGroupWidthsPerRow?.length === 0 ? 0 : buttonGroupWidthsPerRow?.length - 1;

        if (!buttonGroupWidthsPerRow[rowCount]) {
            buttonGroupWidthsPerRow[rowCount] = [];
        }

        const currentRowWidth = (buttonGroupWidthsPerRow[rowCount] ?? [{ actions: [], buttonGroupWidth: 0 }]).reduce(
            (prev, { buttonGroupWidth }) => prev + buttonGroupWidth,
            0,
        );

        if (currentRowWidth + buttonGroupWidth <= toolbarWidth) {
            buttonGroupWidthsPerRow[rowCount].push({ actions, buttonGroupWidth, index });
        } else {
            buttonGroupWidthsPerRow.push([{ actions, buttonGroupWidth, index }]);
        }

        return buttonGroupWidthsPerRow.filter((element) => element.length > 0);
    }, [] as ButtonGroupWidthsPerRow);
};
export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles, actions = [] }) => {
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [buttonGroupsWidths, setButtonGroupsWidths] = useState<ButtonGroupsWidths>([]);
    const [style, setStyle] = useState({ maxWidth: DEFAULT_MAX_WIDTH });

    const [toolbarWidth, setToolbarWidth] = useState<number>(0);

    const toolbarButtonGroupsWidthsPerRow = getButtonGroupWidthsPerRow(toolbarWidth, buttonGroupsWidths);
    const toolbarButtonGroups =
        toolbarButtonGroupsWidthsPerRow.length === 0
            ? [toolbarActions.map((actions, index) => ({ actions, buttonGroupWidth: 0, index }))]
            : toolbarButtonGroupsWidthsPerRow;

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

        setStyle(
            toolbarWidthSum !== 0
                ? {
                      maxWidth: `${toolbarWidthSum + toolbarButtonGroups.length + 20}px`,
                  }
                : { maxWidth: DEFAULT_MAX_WIDTH },
        );
    }, [buttonGroupsWidths]);

    return (
        <BalloonToolbar
            popperOptions={{
                modifiers: [
                    { name: 'offset', options: { offset: [0, 12] } },
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
