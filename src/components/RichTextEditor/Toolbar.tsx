/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BalloonToolbar, usePlateEditorRef } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
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

const DEFAULT_WIDTH = '100%';
const OFFSET_IN_PX = 12;

export const Toolbar: FC<ToolbarCustomProps> = ({ editorId, textStyles, actions = [] }) => {
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [buttonGroupWidths, setButtonGroupWidths] = useState<ButtonGroupWidths>(
        toolbarActions.map((actions, index) => ({ actions, buttonGroupWidth: 0, index })),
    );
    const [style, setStyle] = useState({ width: DEFAULT_WIDTH });
    const [toolbarWidth, setToolbarWidth] = useState<number>(0);
    const [showToolbar, setShowToolbar] = useState(false);

    useMemo(() => {
        if (toolbarRef.current) {
            const observer = new ResizeObserver((entries) => {
                if (entries.length > 0) {
                    /* setTimeout is required to prevent error "ResizeObserver loop limit exceeded" 
                        from being thrown during cypress component tests */
                    setTimeout(() => setToolbarWidth(entries[0].target.clientWidth + 10), 0);
                }
            });

            observer.observe(toolbarRef.current);
            return observer;
        }
    }, [toolbarRef.current]);

    const toolbarButtonGroups = getButtonGroupWidthsPerRow(toolbarWidth, buttonGroupWidths);

    useEffect(() => {
        const toolbarWidthSum = calculateToolbarWidth(toolbarButtonGroups);
        setStyle({
            width:
                toolbarWidthSum !== 0
                    ? `${toolbarWidthSum + toolbarButtonGroups.length + OFFSET_IN_PX}px`
                    : DEFAULT_WIDTH,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonGroupWidths]);
    const arrow = document.querySelector('#arrow');

    return (
        <BalloonToolbar
            popperOptions={{
                ...(showToolbar ? { isHidden: false } : {}),
                modifiers: [
                    { name: 'offset', options: { offset: [0, 2] } },
                    { name: 'flip', options: { fallbackPlacements: ['bottom', 'top', 'right', 'left'] } },
                    {
                        name: 'arrow',
                        options: {
                            element: arrow,
                        },
                    },
                ],
                placement: 'top',
            }}
            styles={{ root: { border: 'none', background: '#ffffff' } }}
            classNames={{
                root: `${showToolbar && 'tw-invisible'}`,
                active: '',
            }}
        >
            <div
                data-test-id="toolbar"
                style={style}
                className={merge([
                    'tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap',
                    style.width === DEFAULT_WIDTH && 'tw-invisible',
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
                                    setShowToolbar={setShowToolbar}
                                    onClose={() => setStyle({ width: DEFAULT_WIDTH })}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </BalloonToolbar>
    );
};
