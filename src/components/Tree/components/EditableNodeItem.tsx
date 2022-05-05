import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export interface EditableNodeItem {
    name: string;
    onEditableSave: (value: string) => void;
}

export const EditableNodeItem = ({ name, onEditableSave }: EditableNodeItem) => {
    const [inputValue, setInputValue] = useState(name);
    const [showInput, setShowInput] = useState<boolean>(false);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setShowInput(false);

            onEditableSave && onEditableSave((event.target as HTMLInputElement).value);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            {showInput ? (
                <div className="tw-flex tw-items-center tw-h-6 tw-gap-2 tw-px-3 tw-border tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent">
                    <input
                        type="text"
                        className="tw-w-full tw-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows tw-text-black tw-placeholder-black-60 dark:tw-text-white"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={onKeyDown}
                    />
                </div>
            ) : (
                <div onDoubleClick={() => setShowInput(true)}>:{name}:</div>
            )}
        </div>
    );
};
