/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OrderableListItem } from '@components/OrderableList';
import { StoryListItem } from '@components/OrderableList/utils/types';

export const renderContent = ({ textContent }: OrderableListItem<StoryListItem>) => {
    return (
        <div className="tw-break-word tw-border tw-border-black-40 tw-border-solid tw-rounded-sm tw-p-3">
            <div className="tw-text-xs tw-text-black-60">Position: Foo</div>
            <hr className="tw-mt-2 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div>{textContent}</div>
        </div>
    );
};
