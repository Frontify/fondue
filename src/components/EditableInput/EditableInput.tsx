import React, {
    ChangeEvent,
    FocusEvent,
    FocusEventHandler,
    KeyboardEvent,
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react';
import { EditableInputHelper } from '@components/EditableInput/lib/helper';
import { DEFAULT_CONTAINER_CLASS, DEFAULT_INPUT_TEXT_CLASS } from '@components/EditableInput/constant';

export enum EditableMode {
    INPUT = 'INPUT',
    LABEL = 'LABEL',
}

/**
 * Define custom Styles with
 * - customContainerClasses (<div>)
 * - customInputTextClasses (<input>)
 *
 * mode: display as Input or Label first
 * enableDoubleClick: Should the input be triggered by a double click or single click
 * targeItemId: additional information to be passed via onClick Event
 */
interface EditableOptionProps {
    customContainerClasses?: string;
    customInputTextClasses?: string;
    mode?: EditableMode;
    enableDoubleClick?: boolean;
    additionalValues?: string;
}

/**
 * Add Children with badges or icons
 * onEditableSave callback to get updated Value
 * onAdditionalValueSave callback with more information (ex. ID)
 * onModeChange callback when state changes
 * options to specify styling and additional behaviours
 */
export interface EditableInputProps {
    children?: React.ReactElement;
    onAdditionalValueSave?: (additionalValue: string, value: string) => void;
    onEditableSave?: (value: string) => void;
    onModeChange?: (editableState?: EditableMode) => void;
    options?: EditableOptionProps;
}

/**
 * Component to switch between Label and Input state
 *
 * Clones the children and adds clickHandlers to flip on Click
 * Offers events for the onSave (switch from input to label),
 * when a switch happens and can be extended with additional information.
 * Options property to adjust click behaviour and styling.
 *
 *
 * @param onEditableSave
 * @param onModeChange
 * @param onAdditionalIDSave
 * @param children
 * @param options
 */
export const EditableInput = ({
    onEditableSave,
    onModeChange,
    onAdditionalValueSave,
    children,
    options,
}: EditableInputProps) => {
    // Read initial text strings from children
    const childrenLabel = EditableInputHelper.getLabel(children);

    // use text strings from children in the input field
    const [inputValue, setInputValue] = useState(childrenLabel);
    const [editableState, setEditableState] = useState<EditableMode>(EditableMode.LABEL);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const listenedRef = useRef();

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
        setTimeout(() => inputRef.current?.focus(), 0);
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
        ? { onDoubleClick: handleSwitchToInput(childrenLabel) }
        : { onClick: handleSwitchToInput(childrenLabel) };

    // Clone Child and add clickHandler and ref to Children
    const ChildrenWithHandler =
        children &&
        React.cloneElement(children, {
            ...clickBehaviour,
            ref: listenedRef,
            'data-test-id': 'node-link-name',
        });

    // If the Input is visible initially focus into it
    if (options?.mode === EditableMode.INPUT) {
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    return (
        <div data-test-id="editable-node-container">
            {editableState === EditableMode.INPUT ? (
                <div className="tw-flex tw-items-center">
                    <div
                        data-test-id="editable-input"
                        className={options?.customContainerClasses ?? DEFAULT_CONTAINER_CLASS}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            className={options?.customInputTextClasses ?? DEFAULT_INPUT_TEXT_CLASS}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>
            ) : (
                <>{ChildrenWithHandler}</>
            )}
        </div>
    );
};
