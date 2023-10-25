/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeProps } from '@components/Badge';
import { IconProps } from '@foundation/Icon/IconProps';
import { AriaBreadcrumbsProps, useBreadcrumbs } from '@react-aria/breadcrumbs';
import { MouseEvent, ReactElement } from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';
import { CurrentBreadcrumbItem } from './CurrentBreadcrumbItem';
import { merge } from '@utilities/merge';

const mapBreadcrumbsToAriaProps = (items: Breadcrumb[]) => ({
    children: items.map(({ label }, index) => (
        <li key={`breadcrumb-${index}`} aria-label={label}>
            {label}
        </li>
    )),
});

export type Breadcrumb = {
    label: string;
    link?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    decorator?: ReactElement<IconProps>;
    bold?: boolean;
    badges?: BadgeProps[];
    'data-test-id'?: string;
};

export type BreadcrumbsProps = {
    items: Breadcrumb[];
    keepRoot?: boolean;
    'data-test-id'?: string;
    verticalGap?: BreadcrumbGap;
};

export enum BreadcrumbGap {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
}

export const verticalGapClassMap: Record<BreadcrumbGap, string> = {
    [BreadcrumbGap.None]: 'tw-gap-y-0',
    [BreadcrumbGap.Small]: 'tw-gap-y-0.5',
    [BreadcrumbGap.Medium]: 'tw-gap-y-1',
};

const FormattedBreadcrumbs = ({ items, keepRoot, 'data-test-id': dataTestId }: BreadcrumbsProps): ReactElement[] => {
    let renderTruncation = true;
    const elements = items.map(({ label, badges, bold, decorator, link, onClick }, index) => {
        const key = `breadcrumb-${index}`;
        const isRootKept = keepRoot && index === 0;
        const isCurrent = index === items.length - 1;
        const isLastItems = index >= items.length - 3;
        const isTruncatedItem = !isRootKept && !isLastItems;
        const isLastItemsToRender = keepRoot ? isLastItems : index >= items.length - 4;

        switch (true) {
            case isCurrent:
                return (
                    <CurrentBreadcrumbItem
                        key={key}
                        label={label}
                        badges={badges}
                        bold={bold}
                        decorator={decorator}
                        link={link}
                        onClick={onClick}
                        data-test-id={dataTestId}
                    />
                );

            case isTruncatedItem && renderTruncation:
                renderTruncation = false;
                return (
                    <BreadcrumbItem
                        key={key}
                        label={'...'}
                        link={link}
                        onClick={onClick}
                        showSeparator={index < items.length - 2}
                        data-test-id={`${dataTestId}-truncation`}
                    />
                );

            case isRootKept:
            case isLastItemsToRender:
                return (
                    <BreadcrumbItem
                        key={key}
                        label={label}
                        link={link}
                        onClick={onClick}
                        showSeparator={index < items.length - 2}
                        data-test-id={dataTestId}
                    />
                );
            default:
                return <span />;
        }
    });
    return [...elements];
};

export const Breadcrumbs = ({
    items,
    keepRoot = true,
    'data-test-id': dataTestId = 'breadcrumb',
    verticalGap = BreadcrumbGap.Medium,
}: BreadcrumbsProps): ReactElement => {
    const props = mapBreadcrumbsToAriaProps(items);
    const { navProps } = useBreadcrumbs(props as AriaBreadcrumbsProps);

    return (
        <nav {...navProps} className="tw-font-sans" aria-label="Breadcrumb" data-test-id={dataTestId}>
            <ol className={merge(['tw-list-none tw-flex tw-flex-wrap', verticalGapClassMap[verticalGap]])}>
                <FormattedBreadcrumbs items={items} keepRoot={keepRoot} data-test-id={dataTestId} />
            </ol>
        </nav>
    );
};
Breadcrumbs.displayName = 'FondueBreadcrumbs';
