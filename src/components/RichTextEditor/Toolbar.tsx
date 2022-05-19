/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BalloonToolbar, usePlateEditorRef } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { default as React, default as React, FC, useEffect, useRef, useState } from 'react';
import { toolbarComponents } from './toolbarComponents';
import { ButtonGroupProps, IconStylingWrapperProps, ToolbarProps } from './types';
import { defaultActions, EditorActions } from './utils/actions';

export const IconStylingWrapper: FC<IconStylingWrapperProps> = ({ icon }) => {
    return <span className="tw-p-2 tw-h-12 tw-justify-center tw-items-center tw-flex">{icon}</span>;
};

const ButtonGroup: FC<ButtonGroupProps> = ({ index, actions, editorId, textStyles, onLoaded, onClose, className }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const editor = usePlateEditorRef(editorId);

    useEffect(() => {
        onLoaded(index, ref.current?.clientWidth);
        onClose();
    }, [ref.current?.clientWidth]);

    return (
        <div
            ref={ref}
            key={index}
            data-test-id={`toolbar-group-${index}`}
            className={merge([
                'tw-flex tw-items-center tw-border-l tw-border-line tw-h-12 tw-border-b tw-p-2',
                className,
            ])}
        >
            {actions.map((action) => (
                <React.Fragment key={action}>{toolbarComponents(editor, editorId, textStyles)[action]}</React.Fragment>
            ))}
        </div>
    );
};

const DEFAULT_MAX_WIDTH = '100%';
const BORDER_PX = 6;

export const Toolbar: FC<ToolbarProps> = ({ editorId, textStyles, actions = [] }) => {
    const toolbarActions = actions.length > 0 ? actions : defaultActions;
    const [buttonGroupsWidths, setButtonGroupsWidths] = useState<{ [index: number]: number | undefined }>({});
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [toolbarWidth, setToolbarWidth] = useState<number>(0);
    const [cssStyles, setCssStyles] = useState({ maxWidth: toolbarWidth || DEFAULT_MAX_WIDTH });
    const [borderClassname, setBorderClassname] = useState('');

    useEffect(() => {
        if (toolbarWidth <= 2) {
            return;
        }
        const lengthButtonGroups = Object.entries(buttonGroupsWidths).length;
        const array: number[][] = [...Array(lengthButtonGroups).keys()].map(() => [0]);

        setToolbarMaxWidth(buttonGroupsWidths, toolbarWidth, array, setCssStyles);
        setBorders(array, setBorderClassname, lengthButtonGroups);

        return;
    }, [buttonGroupsWidths]);

    useEffect(() => {
        if (!toolbarRef.current) {
            return;
        }
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                setToolbarWidth(entries[0].target.clientWidth);
            }
        });
        if (toolbarRef.current) {
            resizeObserver.observe(toolbarRef.current);
        }

        setToolbarWidth(toolbarRef.current?.clientWidth ?? null);

        return () => {
            toolbarRef.current && resizeObserver?.unobserve(toolbarRef.current);
        };
    }, [toolbarRef.current?.clientWidth]);

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
                style={cssStyles}
                className="tw-flex tw-flex-wrap tw-content-start tw-bg-base tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg"
                ref={toolbarRef}
            >
                {toolbarActions.map((actions: EditorActions[], index: number) => (
                    <ButtonGroup
                        key={index}
                        className={borderClassname}
                        actions={actions}
                        index={index}
                        textStyles={textStyles}
                        editorId={editorId}
                        onLoaded={(index, width) => setButtonGroupsWidths((state) => ({ ...state, [index]: width }))}
                        onClose={() => setCssStyles({ maxWidth: DEFAULT_MAX_WIDTH })}
                    />
                ))}
            </div>
        </BalloonToolbar>
    );
};
function setToolbarMaxWidth(
    buttonGroupsWidths: { [index: number]: number | undefined },
    toolbarWidth: number,
    array: number[][],
    setCssStyles: React.Dispatch<React.SetStateAction<{ maxWidth: string | number }>>,
) {
    let sum = 0;

    for (const [, value] of Object.entries(buttonGroupsWidths)) {
        sum += value || 0;

        const index = Math.floor(sum / toolbarWidth);
        array[index]?.push(value || 0);
    }
    const width = Math.max(...array.map((element) => element.reduce((prev, curr) => prev + curr), 0));
    setCssStyles({ maxWidth: `${width + BORDER_PX}px` });
    return sum;
}

function setBorders(
    array: number[][],
    setBorderClassname: React.Dispatch<React.SetStateAction<string>>,
    lengthButtonGroups: number,
) {
    const rowNumber = array.reduce((prev, curr) => (curr.length > 1 ? prev + 1 : prev + 0), 0);

    if (rowNumber === 1) {
        setBorderClassname('first:tw-border-l-0 tw-border-b-0 first:tw-border-l-0 tw-border-l');
    } else if (rowNumber === lengthButtonGroups) {
        setBorderClassname('last:tw-border-b-0 tw-border-b tw-border-l-0 tw-flex-grow');
    } else {
        const lastIndexWithButtonGroupElement = lengthButtonGroups - (lengthButtonGroups - rowNumber) - 1;
        const lengthLastElement = array[lastIndexWithButtonGroupElement].length;
        if (lengthLastElement > 2) {
            setBorderClassname('tw-border-t tw-border-l tw-border-b-0 first:tw-border-t-0');
        } else {
            setBorderClassname('first:tw-border-l-0 last:tw-border-b-0 tw-border-b tw-border-l last:tw-border-l-0');
        }
    }
}
