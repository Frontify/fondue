/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

export const renderContent = ({
    textContent,
    id,
    onSelect,
}: {
    textContent: JSX.Element;
    id: string;
    onSelect: (id: string) => void;
}) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onSelect(id);
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            className="tw-break-words tw-border tw-border-line tw-border-solid tw-rounded-md tw-p-3 tw-outline-none"
            onClick={() => onSelect(id)}
            onKeyDown={handleKeyDown}
        >
            <div className="tw-text-xs tw-text-black-60">id: {id}</div>
            <hr className="tw-mt-2 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div>{textContent}</div>
        </div>
    );
};
