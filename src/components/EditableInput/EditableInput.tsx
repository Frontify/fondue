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

export enum EditableMode {
    INPUT = 'INPUT',
    LABEL = 'LABEL',
    AUTO = 'AUTO',
}

export interface EditableInputProps {
    name: string;
    targetItemId: string;
    onEditableSave: (targetItemId: string, value: string) => void;
    onModeChange?: (editableState: EditableMode) => void;
    mode?: EditableMode;
    children?: ReactNode;
    singleClick?: boolean;
}

export const EditableInput = ({
    name,
    targetItemId,
    onEditableSave,
    onModeChange,
    children,
    mode = EditableMode.AUTO,
    singleClick,
}: EditableInputProps) => {
    const [inputValue, setInputValue] = useState(name);
    const [editableState, setEditableState] = useState<EditableMode>(EditableMode.LABEL);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown: KeyboardEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEditableState(EditableMode.LABEL);
            onModeChange && onModeChange(mode !== EditableMode.AUTO ? mode : EditableMode.LABEL);
            onEditableSave(targetItemId, (event.target as HTMLInputElement).value);
        }
    };

    const handleBlur: FocusEventHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
        setEditableState(EditableMode.LABEL);
        onModeChange && onModeChange(mode !== EditableMode.AUTO ? mode : EditableMode.LABEL);
        onEditableSave(targetItemId, (event.target as HTMLTextAreaElement).value);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSwitchToInput = () => {
        setEditableState(EditableMode.INPUT);
        onModeChange && onModeChange(mode !== EditableMode.AUTO ? mode : EditableMode.INPUT);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    if (mode === EditableMode.INPUT) {
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    return (
        <div data-test-id="editable-node-container">
            {(editableState === EditableMode.INPUT || mode === EditableMode.INPUT) && mode !== EditableMode.LABEL ? (
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
