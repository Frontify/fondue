/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from './TooltipContent.module.scss';

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
        <div className={styles.root}>
            {imageUrl && (
                <div className={styles.imageWrapper}>
                    <img src={imageUrl} alt={description} className={styles.image} />
                </div>
            )}
            <div className={title ? `${styles.body} ${styles.withTitle}` : styles.body}>
                <div className={styles.title}>{title}</div>
                {dataPoint?.type && (
                    <div className={styles.type}>
                        {dataPoint.type}: {dataPoint.title}
                    </div>
                )}
                {descriptionLines.length > 0 && (
                    <div className={styles.description}>
                        {descriptionLines.map((line) => (
                            <div key={line} className={styles.descriptionLine}>
                                {line}
                            </div>
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
        <div key={`${title}-value`} className={styles.item}>
            {color && (
                <span
                    className={styles.itemDot}
                    style={{
                        backgroundColor: color,
                    }}
                />
            )}
            <span>{`${type || title}: `}</span>
            <span className={styles.itemValue}>{`${value} ${valueContext || ''}`}</span>
        </div>
    );
};
