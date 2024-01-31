/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useListBoxSection } from '@react-aria/listbox';
import { ReactElement } from 'react';
import { SearchResultSectionProps } from './types';
import { SearchResultOption } from './SearchResultOption';

export const SearchResultSection = ({
    heading,
    state,
    keyItemRecord,
    machineService,
}: SearchResultSectionProps): ReactElement => {
    const { itemProps, groupProps } = useListBoxSection({
        heading: heading.rendered,
        'aria-label': heading['aria-label'],
    });

    return (
        <li {...itemProps} className="tw-border-b tw-border-b-black-10 last:tw-border-0">
            <ul
                {...groupProps}
                data-test-id="link-chooser-select-section"
                className="tw-py-2 tw-px-0 tw-m-0 tw-list-none"
            >
                {[...heading.childNodes].map((node) => (
                    <SearchResultOption
                        key={node.key}
                        item={node}
                        state={state}
                        keyItemRecord={keyItemRecord}
                        machineService={machineService}
                    />
                ))}
            </ul>
        </li>
    );
};
