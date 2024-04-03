/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useListBox } from '@react-aria/listbox';
import { useActor } from '@xstate/react';
import { type ReactElement, useMemo, useRef } from 'react';

import { getKeyItemRecord, getMenuItems } from '@components/ActionMenu/Aria/helper';

import { NavigationMenuItem } from './NavigationMenu';
import { SearchResultSection } from './SearchResultSection';
import BackgroundIcon from './assets/background.svg';
import NoResultsIcon from './assets/no-results.svg';
import FetchingIcon from './assets/nook-animated.png';
import { defaultSection } from './sections';
import { type SearchResultListProps } from './types';
import { findSection } from './utils/helpers';
import { isFetching, isUnsuccessful, shouldGoBack } from './utils/state';

export const SearchResultsList = (props: SearchResultListProps): ReactElement => {
    const ref = useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state, menuBlocks, machineService } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);

    const [
        {
            context: { extraSections, currentSectionId, searchResults, query },
            matches,
        },
        send,
    ] = useActor(machineService);

    const currentSection = useMemo(
        () => findSection(extraSections, currentSectionId) || defaultSection,
        [currentSectionId, extraSections],
    );

    if (isFetching(matches)) {
        return <FetchingAnimation />;
    }

    if (isUnsuccessful(matches)) {
        return <FetchingError />;
    }

    return (
        <div>
            {shouldGoBack(matches) && (
                <div className="tw-mt-2">
                    <NavigationMenuItem
                        state={state}
                        section={currentSection}
                        onPress={() => {
                            send({
                                type: 'BACK_TO_DEFAULT',
                                data: { getExtraResultsByQuery: null },
                            });
                        }}
                        direction="left"
                    />
                </div>
            )}
            <ul
                {...listBoxProps}
                data-test-id="link-chooser-results-list"
                ref={listBoxRef}
                className="tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-z-20 focus-visible:tw-outline-none"
            >
                {searchResults.length > 0 ? (
                    [...state.collection]
                        .filter((section) => section.key === 'search')
                        .map((item) => (
                            <SearchResultSection
                                key={item.key}
                                heading={item}
                                state={state}
                                keyItemRecord={keyItemRecord}
                                machineService={machineService}
                            />
                        ))
                ) : (
                    <EmptyResults
                        prompt={
                            query
                                ? `We could not find any results for "${query}".`
                                : 'Use the search above to discover your brand assets, or enter a URL'
                        }
                        icon={query ? NoResultsIcon : BackgroundIcon}
                    />
                )}
            </ul>
        </div>
    );
};

const EmptyResults = ({ prompt, icon }: { prompt: string; icon: string }): ReactElement => (
    <div
        data-test-id="link-chooser-empty-results"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[278px] tw-p-3"
    >
        <img className="tw-w-[150px] tw-mb-5" src={icon} alt="Icon" />
        <p className="tw-text-black-60 tw-text-center">{prompt}</p>
    </div>
);

const FetchingError = ({
    error = 'An error occurred while fetching the results',
}: {
    error?: string;
}): ReactElement => (
    <div
        data-test-id="link-chooser-error"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[278px] tw-p-3"
    >
        <img className="tw-w-[75px] tw-mb-5" src={NoResultsIcon} alt="Error" />
        <p className="tw-text-black-60 tw-text-center">{error}</p>
    </div>
);

const FetchingAnimation = (): ReactElement => (
    <div
        data-test-id="link-chooser-loader"
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[278px] tw-p-3"
    >
        <img className="tw-w-[50px]" src={FetchingIcon} alt="Fetching" />
    </div>
);
