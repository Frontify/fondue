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

export interface EditableInputProps {
    name: string;
    targetItemId: string;
    onEditableSave: (targetItemId: string, value: string) => void;
    children?: ReactNode;
}

export const EditableInput = ({ name, targetItemId, onEditableSave, children }: EditableInputProps) => {
    const [inputValue, setInputValue] = useState(name);
    const [showInput, setShowInput] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown: KeyboardEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setShowInput(false);

            onEditableSave(targetItemId, (event.target as HTMLInputElement).value);
        }
    };

    const handleBlur: FocusEventHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
        setShowInput(false);

        onEditableSave(targetItemId, (event.target as HTMLTextAreaElement).value);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleDoubleClick = () => {
        setShowInput(true);

        setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
        <div data-test-id="editable-node-container">
            {showInput ? (
                <div className="tw-flex tw-items-center">
                    <div
                        data-test-id="node-editable"
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
                <div
                    data-test-id="node-link-name"
                    className="tw-flex tw-items-center"
                    onDoubleClick={handleDoubleClick}
                >
                    {name}
                    {children}
                </div>
            )}
        </div>
    );
};
