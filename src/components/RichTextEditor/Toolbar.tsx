/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BalloonToolbar, usePlateEditorRef } from '@udecode/plate';
import React, { FC, useEffect, useRef, useState } from 'react';
import { toolbarComponents } from './toolbarComponents';
import { ButtonGroupProps, ButtonGroupWidths, ToolbarCustomProps } from './types';
import { defaultActions } from './utils/actions';
import { calculateToolbarWidth, getButtonGroupWidthsPerRow } from './utils/toolbarCalc';

const ButtonGroup: FC<ButtonGroupProps> = ({
    index,
    actions,
    editorId,
    textStyles,
    onLoaded,
    onClose,
    setShowToolbar,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const editor = usePlateEditorRef(editorId);

    useEffect(() => {
        onLoaded(index, ref.current?.clientWidth);

        return onClose();
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
                <React.Fragment key={action}>
                    {toolbarComponents(editor, editorId, textStyles, setShowToolbar)[action]}
                </React.Fragment>
            ))}
        </div>
    );
};

export const Toolbar: FC<ToolbarCustomProps> = ({ editorId, textStyles, actions = [], rteWidth }) => {
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const [buttonGroupWidths, setButtonGroupWidths] = useState<ButtonGroupWidths>(
        toolbarActions.map((actions, index) => ({ actions, buttonGroupWidth: 0, index })),
    );
    const maxWidth = buttonGroupWidths.reduce((prev, { buttonGroupWidth }) => prev + buttonGroupWidth, 0);

    const [width, setWidth] = useState<number | null>(null);
    const [hideToolbar, setHideToolbar] = useState(false);

    const toolbarButtonGroups =
        maxWidth > rteWidth ? getButtonGroupWidthsPerRow(rteWidth, buttonGroupWidths) : [buttonGroupWidths];

    const toolbarWidthSum = calculateToolbarWidth(toolbarButtonGroups);
    useEffect(() => {
        if (toolbarWidthSum !== 0) {
            setWidth(toolbarWidthSum + buttonGroupWidths.length * 2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonGroupWidths, rteWidth]);

    return (
        <BalloonToolbar
            popperOptions={{
                ...(hideToolbar ? { isHidden: false } : {}),
                modifiers: [
                    { name: 'offset', options: { offset: [0, 2] } },
                    { name: 'flip', options: { fallbackPlacements: ['bottom', 'top', 'right', 'left'] } },
                    {
                        name: 'sameWidth',
                        enabled: true,
                        fn: ({ state }) => {
                            state.styles.popper.width = width ? `${width}px` : '100%';
                        },
                        phase: 'beforeWrite',
                        requires: ['computeStyles'],
                    },
                ],
                placement: 'top',
            }}
            styles={{
                root: {
                    border: 'none',
                    background: '#ffffff',
                    visibility: hideToolbar ? 'hidden' : 'visible', //|| !width
                },
            }}
        >
            <div
                data-test-id="toolbar"
                className="tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
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
                                        return setButtonGroupWidths((state) => {
                                            const newState = [...state];
                                            newState[index] = {
                                                actions,
                                                buttonGroupWidth: width ?? 0,
                                                index,
                                            };
                                            return newState;
                                        });
                                    }}
                                    setShowToolbar={setHideToolbar}
                                    onClose={() => setWidth(null)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </BalloonToolbar>
    );
};
