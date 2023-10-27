/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeProps } from '@components/Badge';
import { IconProps } from '@foundation/Icon/IconProps';
import { AriaBreadcrumbsProps, useBreadcrumbs } from '@react-aria/breadcrumbs';
import { MouseEvent, ReactElement } from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';
import { CurrentBreadcrumbItem } from './CurrentBreadcrumbItem';
import { merge } from '@utilities/merge';
import { IconDotsHorizontal16 } from '@foundation/Icon';

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
} & Pick<BreadcrumbsProps, 'includesCurrent'>;

export type BreadcrumbsProps = {
    items: Breadcrumb[];
    keepRoot?: boolean;
    includesCurrent?: boolean;
    truncate?: boolean;
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

const FormattedBreadcrumbs = ({
    items,
    keepRoot,
    includesCurrent = false,
    truncate = false,
    'data-test-id': dataTestId,
}: BreadcrumbsProps): ReactElement[] => {
    let renderTruncation = true;
    const elements = items.map(({ label, badges, bold, decorator, link, onClick }, index) => {
        const key = `breadcrumb-${index}`;
        const isRootKept = keepRoot && index === 0;
        const isCurrent = index === items.length - 1;
        const isLastItems = index >= items.length - 2;
        const isTruncatedItem = truncate && !isRootKept && !isLastItems;
        const isLastItemsToRender = keepRoot ? isLastItems : index >= items.length - 3;
        const showSeparator = index < items.length - 2 || (includesCurrent && index === items.length - 2);

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
                        includesCurrent={includesCurrent}
                        data-test-id={dataTestId}
                    />
                );

            case !truncate:
            case isRootKept:
            case isLastItemsToRender:
                return (
                    <BreadcrumbItem
                        key={key}
                        label={label}
                        decorator={decorator}
                        link={link}
                        onClick={onClick}
                        showSeparator={showSeparator}
                        data-test-id={dataTestId}
                    />
                );

            case isTruncatedItem && renderTruncation:
                renderTruncation = false;
                return (
                    <BreadcrumbItem
                        key={key}
                        label={''}
                        decorator={<IconDotsHorizontal16 />}
                        link={link}
                        onClick={onClick}
                        showSeparator={showSeparator}
                        data-test-id={`${dataTestId}-truncation`}
                    />
                );

            default:
                return <span key={key} />;
        }
    });
    return [...elements];
};

export const Breadcrumbs = ({
    items,
    keepRoot = true,
    truncate = false,
    includesCurrent = false,
    'data-test-id': dataTestId = 'breadcrumb',
    verticalGap = BreadcrumbGap.Medium,
}: BreadcrumbsProps): ReactElement => {
    const props = mapBreadcrumbsToAriaProps(items);
    const { navProps } = useBreadcrumbs(props as AriaBreadcrumbsProps);

    return (
        <nav {...navProps} className="tw-font-sans" aria-label="Breadcrumb" data-test-id={dataTestId}>
            <ol className={merge(['tw-list-none tw-flex tw-flex-wrap', verticalGapClassMap[verticalGap]])}>
                <FormattedBreadcrumbs
                    items={items}
                    keepRoot={keepRoot}
                    truncate={truncate}
                    includesCurrent={includesCurrent}
                    data-test-id={dataTestId}
                />
            </ol>
        </nav>
    );
};
Breadcrumbs.displayName = 'FondueBreadcrumbs';
