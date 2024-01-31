/* (c) Copyright Frontify Ltd., all rights reserved. */

export const renderContent = ({
    textContent,
    id,
    onSelect,
}: {
    textContent: JSX.Element;
    id: string;
    onSelect: (id: string) => void;
}) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onSelect(id);
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className="tw-break-word tw-border tw-border-black-40 tw-border-solid tw-rounded-md tw-p-3 tw-outline-none tw-border-line"
            onClick={() => onSelect(id)}
            onKeyDown={handleKeyDown}
        >
            <div className="tw-text-xs tw-text-black-60">id: {id}</div>
            <hr className="tw-mt-2 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div>{textContent}</div>
        </div>
    );
};
