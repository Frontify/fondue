import React, {
    ChangeEvent,
    FocusEvent,
    FocusEventHandler,
    KeyboardEvent,
    KeyboardEventHandler,
    ReactNode,
    useRef,
    useState,
} from 'react';

export enum EditableInputState {
    INPUT = 'INPUT',
    LABEL = 'LABEL',
}

export interface EditableInputProps {
    name: string;
    targetItemId: string;
    onEditableSave: (targetItemId: string, value: string) => void;
    onEditableChange?: (editableState: EditableInputState) => void;
    overrideEditableState?: EditableInputState;
    children?: ReactNode;
    singleClick?: boolean;
}

export const EditableInput = ({
    name,
    targetItemId,
    onEditableSave,
    onEditableChange,
    children,
    overrideEditableState,
    singleClick,
}: EditableInputProps) => {
    const [inputValue, setInputValue] = useState(name);
    const [editableState, setEditableState] = useState<EditableInputState>(EditableInputState.LABEL);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown: KeyboardEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEditableState(EditableInputState.LABEL);
            onEditableChange && onEditableChange(overrideEditableState ?? EditableInputState.LABEL);
            onEditableSave(targetItemId, (event.target as HTMLInputElement).value);
        }
    };

    const handleBlur: FocusEventHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
        setEditableState(EditableInputState.LABEL);
        onEditableChange && onEditableChange(overrideEditableState ?? EditableInputState.LABEL);
        onEditableSave(targetItemId, (event.target as HTMLTextAreaElement).value);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSwitchToInput = () => {
        setEditableState(EditableInputState.INPUT);
        onEditableChange && onEditableChange(overrideEditableState ?? EditableInputState.INPUT);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
        <div data-test-id="editable-node-container">
            {(editableState === EditableInputState.INPUT || overrideEditableState === EditableInputState.INPUT) &&
            overrideEditableState !== EditableInputState.LABEL ? (
                <div className="tw-flex tw-items-center">
                    <div
                        data-test-id="editable-input"
                        className="tw-flex tw-items-center tw-h-6 tw-gap-2 tw-px-3 tw-border tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-base"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            className="tw-w-full tw-grow tw-border-none tw-outline-none tw-bg-base tw-hide-input-arrows tw-text-text tw-placeholder-text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                        />
                    </div>

                    {children}
                </div>
            ) : (
                <button
                    data-test-id="node-link-name"
                    className="tw-flex tw-items-center"
                    onDoubleClick={handleSwitchToInput}
                    onClick={singleClick ? handleSwitchToInput : undefined}
                >
                    {name}
                    {children}
                </button>
            )}
        </div>
    );
};
