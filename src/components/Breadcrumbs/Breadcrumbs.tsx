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

export const Breadcrumbs = ({
    items,
    'data-test-id': dataTestId = 'breadcrumb',
    verticalGap = BreadcrumbGap.Medium,
}: BreadcrumbsProps): ReactElement => {
    const props = mapBreadcrumbsToAriaProps(items);
    const { navProps } = useBreadcrumbs(props as AriaBreadcrumbsProps);

    return (
        <nav {...navProps} className="tw-font-sans" aria-label="Breadcrumb" data-test-id={dataTestId}>
            <ol className={merge(['tw-list-none tw-flex tw-flex-wrap', verticalGapClassMap[verticalGap]])}>
                {items.map(({ label, badges, bold, decorator, link, onClick }, index) => {
                    const isCurrent = index === items.length - 1;
                    const key = `breadcrumb-${index}`;

                    if (isCurrent) {
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
                    }

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
                })}
            </ol>
        </nav>
    );
};
Breadcrumbs.displayName = 'FondueBreadcrumbs';
