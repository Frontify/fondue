/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BalloonToolbar, usePlateEditorRef } from '@udecode/plate';
import React, { FC, useEffect, useRef, useState } from 'react';
import { toolbarComponents } from './toolbarComponents';
import { ButtonGroupProps, ButtonGroupWidths, ToolbarCustomProps } from './types';
import { defaultActions } from './utils/actions';
import { calculateToolbarWidth, getButtonGroupWidthsPerRow } from './utils/toolbarCalc';

const ButtonGroup: FC<ButtonGroupProps> = ({ index, actions, editorId, textStyles, onLoaded }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const editor = usePlateEditorRef(editorId);

    useEffect(() => {
        onLoaded(index, ref.current?.clientWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

const OFFSET_IN_PX = 12;

export const Toolbar: FC<ToolbarCustomProps> = ({ editorId, textStyles, actions = [], editorWidth }) => {
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [buttonGroupWidths, setButtonGroupWidths] = useState<ButtonGroupWidths>(
        toolbarActions.map((actions, index) => ({ actions, buttonGroupWidth: 0, index })),
    );
    const [width, setWidth] = useState<number | null>(null);
    const toolbarButtonGroups = getButtonGroupWidthsPerRow(editorWidth || 0, buttonGroupWidths);

    useEffect(() => {
        const toolbarWidthSum = calculateToolbarWidth(toolbarButtonGroups);
        if (toolbarWidthSum > 0) {
            setWidth(toolbarWidthSum + toolbarButtonGroups.length + OFFSET_IN_PX);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonGroupWidths]);
    const arrow = document.querySelector('#arrow');

    return (
        <BalloonToolbar
            popperOptions={{
                modifiers: [
                    { name: 'offset', options: { offset: [0, 2] } },
                    { name: 'flip', options: { fallbackPlacements: ['bottom', 'top'] } },
                    {
                        name: 'arrow',
                        options: {
                            element: arrow,
                        },
                    },
                    {
                        name: 'hideUntilComputed',
                        enabled: true,
                        phase: 'beforeMain',
                        fn: ({ state }) => {
                            state.styles.popper = {
                                ...state.styles.popper,
                                visibility: 'hidden',
                                width: `${width}px`,
                            };
                        },
                    },
                    {
                        name: 'showWhenComputed',
                        enabled: true,
                        phase: 'beforeWrite',
                        fn: ({ state }) => {
                            console.log(width);
                            if (width) {
                                state.styles.popper.visibility = 'visible';
                            }
                        },
                        requires: ['hideUntilComputed'],
                    },
                ],
                placement: 'top',
            }}
            styles={{ root: { border: 'none', background: '#ffffff' } }}
        >
            <div
                data-test-id="toolbar"
                className="tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
                ref={toolbarRef}
            >
                {toolbarButtonGroups.map((row, index) => (
                    <div key={index} className="tw-divide-x tw-divide-line tw-flex tw-w-full tw-flex-wrap">
                        {row.map(({ actions, index }) => (
                            <ButtonGroup
                                key={index}
                                actions={actions}
                                index={index}
                                textStyles={textStyles}
                                editorId={editorId}
                                onLoaded={(index, width) =>
                                    setButtonGroupWidths((state) => {
                                        const newState = [...state];
                                        newState[index] = {
                                            actions,
                                            buttonGroupWidth: width ?? 0,
                                            index,
                                        };
                                        return newState;
                                    })
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
        </BalloonToolbar>
    );
};
