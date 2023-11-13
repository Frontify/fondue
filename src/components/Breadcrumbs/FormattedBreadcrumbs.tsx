/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useRef } from 'react';
import { BreadcrumbsProps } from './Breadcrumbs';
import { CurrentBreadcrumbItem } from './CurrentBreadcrumbItem';
import { BreadcrumbItem } from './BreadcrumbItem';
import { OverflowMenu, OverflowMenuItemProps } from '..';

export const FormattedBreadcrumbs = ({
    items,
    keepRoot,
    activeInline = false,
    truncate = false,
    'data-test-id': dataTestId,
}: BreadcrumbsProps): ReactElement[] => {
    const renderTruncationRef = useRef<boolean>(true);

    const elements = items.map(({ label, badges, bold, decorator, link, onClick }, index) => {
        const key = `breadcrumb-${index}`;
        const isRootKept = keepRoot && index === 0;
        const isCurrent = index === items.length - 1;
        const startLastItemIndex = keepRoot ? 2 : 3;
        const lastItemsIndex = items.length - startLastItemIndex;
        const isLastItems = index >= lastItemsIndex;
        const isTruncatedItem = truncate && !isRootKept && !isLastItems;
        const showSeparator = index < items.length - 1;

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
                        activeInline={activeInline}
                        data-test-id={dataTestId}
                    />
                );

            case !truncate:
            case isRootKept:
            case isLastItems:
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

            case isTruncatedItem && renderTruncationRef.current:
                renderTruncationRef.current = false;
                const overFlowItems: OverflowMenuItemProps[] = [];
                let count = -1;
                for (const element of items) {
                    count++;
                    if (count >= lastItemsIndex) {
                        break;
                    } else if (keepRoot && count === 0) {
                        continue;
                    } else {
                        const { label, link, onClick } = element;
                        overFlowItems.push({ label, link, onClick });
                    }
                }
                return (
                    <BreadcrumbItem
                        key={key}
                        label={''}
                        decorator={decorator}
                        showSeparator={showSeparator}
                        data-test-id={`${dataTestId}-truncation`}
                    >
                        <OverflowMenu items={overFlowItems} data-test-id={`${dataTestId}-overflow-menu`} />
                    </BreadcrumbItem>
                );

            default:
                return <span key={key} />;
        }
    });
    return [...elements];
};
FormattedBreadcrumbs.displayname = 'FondueFormattedBreadcrumbs';
