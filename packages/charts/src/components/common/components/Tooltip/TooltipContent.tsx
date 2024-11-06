/* (c) Copyright Frontify Ltd., all rights reserved. */

type TooltipEntry = {
    title: string;
    color?: string;
    value: string | number;
    valueContext?: string;
    type?: string;
    typeByGrouping?: string;
};

type TooltipContentV2Props = {
    entries: TooltipEntry[];
    title?: string;
    description?: string;
    imageUrl?: string;
};

export const TooltipContent = ({ title, description, imageUrl, entries }: TooltipContentV2Props) => {
    const descriptionLines = description?.split('\n') ?? [];
    const dataPoint = entries[1];

    return (
        <div className="tw-bg-[var(--text-color)] tw-p-3 tw-rounded tw-border tw-border-button-border">
            {imageUrl && <img src={imageUrl} alt={description} className="tw-w-48 tw-h-28 tw-object-cover tw-mb-3" />}
            <div className={title ? 'tw-pb-3' : ''}>
                <div className="tw-text-sm tw-leading-5 tw-text-base-alt tw-font-bold">{title}</div>
                {dataPoint?.type && (
                    <div className="tw-text-sm tw-text-base-alt tw-pb-2">
                        {dataPoint.type}: {dataPoint.title}
                    </div>
                )}
                {descriptionLines.length > 0 && (
                    <div className="tw-text-base tw-text-xs">
                        {descriptionLines.map((line) => (
                            <div key={line}>{line}</div>
                        ))}
                    </div>
                )}
            </div>
            {entries.map((entry) => (
                <TooltipItem
                    key={entry.title}
                    title={entry.title}
                    color={entry.color}
                    value={entry.value}
                    type={entry?.typeByGrouping}
                    valueContext={entry?.valueContext}
                />
            ))}
        </div>
    );
};

export type TooltipItemProps = {
    title: string;
    value: string | number;
    color?: string;
    type?: string;
    valueContext?: string;
};

const TooltipItem = ({ title, value, color, type, valueContext }: TooltipItemProps) => {
    return (
        <div key={`${title}-value`} className="tw-text-[var(--fc-base-color)] tw-text-sm tw-font-normal">
            {color && (
                <span
                    className="tw-inline-block tw-w-2 tw-h-2 tw-rounded-full tw-mr-1"
                    style={{
                        backgroundColor: color,
                    }}
                />
            )}
            <span>{`${type || title}: `}</span>
            <span className="tw-font-semibold">{`${value} ${valueContext || ''}`}</span>
        </div>
    );
};
