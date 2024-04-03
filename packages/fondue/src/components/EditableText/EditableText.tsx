/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ChangeEvent,
    type FocusEvent,
    type FocusEventHandler,
    type KeyboardEvent,
    type KeyboardEventHandler,
    type ReactElement,
    cloneElement,
    useEffect,
    useRef,
    useState,
} from 'react';

import { EditableTextHelper } from '@components/EditableText/lib/helper';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

export enum EditableMode {
    INPUT = 'INPUT',
    LABEL = 'LABEL',
}

interface InputStyling {
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
    minWidth: string;
    fontWeight: string;
}

/**
 * isSlimInputField: removes padding
 * mode: display as Input or Label first
 * enableDoubleClick: Should the input be triggered by a double click or single click
 * additionalValues: additional information to be passed via onClick Event
 * removeBoxPadding: Removes the Padding (tw-p-2) around the input Box
 */
interface EditableOptionProps {
    isSlimInputField?: boolean;
    mode?: EditableMode;
    enableDoubleClick?: boolean;
    additionalValues?: string;
    removeBoxPadding?: boolean;
}

/**
 * Add Children with badges or icons
 * onEditableSave callback to get updated Value
 * onAdditionalValueSave callback with more information (ex. ID)
 * onModeChange callback when state changes
 * options to specify styling and additional behaviours
 */
export interface EditableTextProps {
    children?: ReactElement;
    onAdditionalValueSave?: (additionalValue: string, value: string) => void;
    onEditableSave?: (value: string) => void;
    onModeChange?: (editableState?: EditableMode) => void;
    options?: EditableOptionProps;
    /** @deprecated Temporary solution for text with ellipisis in Tree Component */
    isOverflowing?: boolean;
    'data-test-id'?: string;
}

/**
 * Component to switch between Label and Input state. Wraps the Children
 * with a Button, to allow for accessibility and copies styles to input field
 *
 * Events:
 * - onEditableSave         // When changing from input to label state
 * - onModeChange           // Indicates which state is active
 * - onAdditionalValueSave  // Similar to editable Save with additional Values provided
 *
 * Options properties:
 * - mode:                   enum EditableMode  // {INPUT = 'INPUT',LABEL = 'LABEL'}
 * - enableDoubleClick:      boolean            // should the input be triggered by a double click or single click
 * - isSlimInputField:       boolean            // removes y padding
 * - additionalValues?:      string             // additional Values like ID
 *
 */
export const EditableText = ({
    onEditableSave,
    onModeChange,
    onAdditionalValueSave,
    children,
    options,
    isOverflowing = false,
    'data-test-id': dataTestId = 'editable-node-container',
}: EditableTextProps) => {
    // Read initial text strings from children
    const childrenLabel = EditableTextHelper.getLabel(children);

    // use text strings from children in the input field
    const [inputValue, setInputValue] = useState(childrenLabel);
    const [editableState, setEditableState] = useState<EditableMode>(EditableMode.LABEL);
    const [inputStyling, setInputStyling] = useState<InputStyling>();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

    const handleSwitchToLabel = (event: KeyboardEvent | FocusEvent) => {
        setEditableState(EditableMode.LABEL);

        onModeChange && onModeChange(EditableMode.LABEL);
        options?.additionalValues &&
            onAdditionalValueSave &&
            onAdditionalValueSave(options.additionalValues, (event.target as HTMLTextAreaElement).value);
        onEditableSave && onEditableSave((event.target as HTMLTextAreaElement).value);
    };

    const handleSwitchToInput = (childrenText: string) => () => {
        setInputValue(childrenText);
        setEditableState(EditableMode.INPUT);
        onModeChange && onModeChange(EditableMode.INPUT);
    };

    const handleKeyDown: KeyboardEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSwitchToLabel(event);
        }
    };
    const handleBlur: FocusEventHandler = (event: FocusEvent<HTMLTextAreaElement>) => handleSwitchToLabel(event);

    // Set initial state of component if provided in the mode
    useEffect(() => setEditableState(options?.mode ?? EditableMode.LABEL), [options?.mode]);

    const clickBehaviour = options?.enableDoubleClick
        ? {
              onDoubleClick: handleSwitchToInput(childrenLabel),
              onKeyPress: (event: KeyboardEvent) => event.key === 'Enter' && handleSwitchToInput(childrenLabel)(),
          }
        : {
              onClick: handleSwitchToInput(childrenLabel),
          };

    // Update Input Style and select input field if visible
    useEffect(() => {
        if (childRef.current) {
            setInputStyling(EditableTextHelper.copyStyles(childRef.current));
        }

        if (editableState === EditableMode.INPUT) {
            inputRef.current?.select();
        }
    }, [editableState, inputRef, children]);

    const childRef = useRef();

    // Clone Child and add ref to Children
    const ChildrenWithRef =
        children &&
        cloneElement(children, {
            ref: childRef,
        });

    return (
        <div
            data-test-id={dataTestId}
            className={merge(['tw-relative tw-h-full', options?.removeBoxPadding === true ? '' : 'tw-p-2'])}
        >
            {editableState === EditableMode.INPUT ? (
                <div
                    className={merge([
                        'tw-flex tw-items-center',
                        options?.isSlimInputField === true
                            ? '-tw-translate-x-[0.315rem] -tw-translate-y-[0.07rem]'
                            : '-tw-translate-x-[0.81rem] -tw-translate-y-[0.56rem]',
                    ])}
                >
                    <div
                        data-test-id="editable-input"
                        className={merge(['tw-relative', isOverflowing && 'tw-w-full tw-flex tw-items-center'])}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            className={merge([
                                options?.isSlimInputField === true
                                    ? 'focus-visible:tw-outline-none'
                                    : FOCUS_VISIBLE_STYLE,
                                'tw-absolute tw-w-full tw-text-text tw-border tw-rounded tw-bg-base tw-border-solid',
                                options?.isSlimInputField === true ? 'tw-py-0 tw-px-1' : 'tw-px-3 tw-py-2',
                            ])}
                            style={inputStyling}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                        />
                        <span
                            aria-hidden="true"
                            className={merge([
                                'tw-rounded tw-px-4 tw-py-2 tw-bg-base tw-truncate',
                                options?.isSlimInputField === true && 'tw-py-0 tw-px-2',
                                isOverflowing && 'tw-w-0',
                            ])}
                            style={inputStyling}
                        >
                            {inputValue}
                        </span>
                    </div>
                </div>
            ) : null}
            <button
                style={{ display: editableState === EditableMode.INPUT ? 'none' : 'flex' }}
                className={merge([isOverflowing && 'tw-w-full', 'tw-h-full tw-items-center', FOCUS_VISIBLE_STYLE])}
                {...clickBehaviour}
                data-test-id={'node-link-name'}
                aria-pressed="false"
            >
                {ChildrenWithRef}
            </button>
        </div>
    );
};
EditableText.displayName = 'FondueEditableText';
