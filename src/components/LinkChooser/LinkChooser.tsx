/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mapToAriaProps } from '@components/ActionMenu/Aria/helper';
import { Checkbox, CheckboxState } from '@components/Checkbox/Checkbox';
import { useDropdownAutoHeight } from '@hooks/useDropdownAutoHeight';
import {
    IconArrowOutExternal,
    IconBuildingBlock,
    IconDocument,
    IconDocumentStack,
    IconLayersSingle,
    IconLink,
} from '@foundation/Icon/Generated';
import { useComboBox } from '@react-aria/combobox';
import { DismissButton } from '@react-aria/overlays';
import { scrollIntoView } from '@react-aria/utils';
import { useComboBoxState } from '@react-stately/combobox';
import { Validation } from '@utilities/validation';
import { useMachine } from '@xstate/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Key, MouseEvent, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavigationMenu } from './NavigationMenu';
import { Popover } from './Popover';
import { SearchInput } from './SearchInput';
import { SearchResultsList } from './SearchResultsList';
import { defaultSection } from './sections';
import { linkChooserMachine } from './state/machine';
import { LinkChooserState } from './state/types';
import { IconName, LinkChooserProps, SearchMenuBlock } from './types';
import { decoratedResults, doesContainSubstring, findSection, getDefaultData } from './utils/helpers';
import { closeBoxState, isLoaded, openBoxState, queryMatchesSelection, shouldGoBack } from './utils/state';
import { createCustomLink } from './utils/transformers';
import { useManualComboBoxEventHandlers } from './utils/useManualComboBoxHandlers';

export const IconOptions: Record<IconName | string, ReactElement> = {
    [IconName.Document]: <IconDocument />,
    [IconName.Library]: <IconDocumentStack />,
    [IconName.Link]: <IconLink />,
    [IconName.External]: <IconArrowOutExternal />,
    [IconName.Template]: <IconLayersSingle />,
    [IconName.Block]: <IconBuildingBlock />,
};

export const DEFAULT_ICON = IconName.Link;
export const CUSTOM_LINK_ID = 'custom-link';
export const MAX_STORED_ITEMS = 5;
export const QUERIES_STORAGE_KEY = 'queries';

export const LinkChooser = ({
    getGlobalByQuery = getDefaultData,
    openPreview = window.open,
    clipboardOptions = navigator.clipboard,
    selectedResult = null,
    openInNewTab = false,
    ariaLabel = 'Menu',
    extraSections = [],
    label,
    placeholder,
    onOpenInNewTabChange,
    onLinkChange,
    disabled,
    clearable,
    required,
    validation = Validation.Default,
    'data-test-id': dataTestId = 'link-chooser',
}: LinkChooserProps): ReactElement => {
    const [{ context, matches, value }, send, service] = useMachine(() =>
        linkChooserMachine.withContext({
            searchResults: [],
            selectedResult,
            query: '',
            interruptedFetch: false,
            getExtraResultsByQuery: null,
            currentSectionId: defaultSection.id,
            extraSections,
            clipboardOptions,
            openPreview,
            getGlobalByQuery,
            onLinkChange,
        }),
    );

    const [searchInput, setSearchInput] = useState(selectedResult?.title);
    const isDefault = !shouldGoBack(matches);
    const searchResultMenuBlocks = useMemo(
        () =>
            [
                !isDefault && { id: 'menu-top', menuItems: [findSection(extraSections, context.currentSectionId)] },
                {
                    id: 'search',
                    menuItems: decoratedResults(context.searchResults),
                },
                isDefault && { id: 'menu-bottom', menuItems: extraSections.map(({ id, title }) => ({ id, title })) },
            ].filter(Boolean),
        [isDefault, extraSections, context.currentSectionId, context.searchResults],
    ) as SearchMenuBlock[];

    const props = mapToAriaProps(ariaLabel, searchResultMenuBlocks);

    const triggerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listBoxRef = useRef<HTMLUListElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const handleSelectionChange = (key: Key) => {
        const foundItem = context.searchResults.find((item) => item.id === key);
        if (foundItem) {
            setSearchInput(foundItem.title);
            send({ type: 'SET_SELECTED_SEARCH_RESULT', data: { selectedResult: foundItem } });
        }
        closeBoxState(state);
        setSelectedKey(key);
    };

    const handleInputChange = useCallback(
        (query: string) => {
            setSearchInput(query);
            send({ type: 'TYPING', data: { query } });
        },
        [send],
    );

    const [selectedKey, setSelectedKey] = useState<Key | undefined>(context.selectedResult?.id);

    const state = useComboBoxState({
        ...props,
        defaultFilter: (textValue, inputValue) => doesContainSubstring(textValue, inputValue, extraSections),
        inputValue: searchInput,
        onInputChange: handleInputChange,
        onSelectionChange: handleSelectionChange,
        menuTrigger: 'manual',
        shouldCloseOnBlur: false,
        allowsEmptyCollection: true,
        selectedKey,
    });

    const { inputProps, listBoxProps, labelProps } = useComboBox(
        {
            ...props,
            inputRef,
            listBoxRef,
            popoverRef,
            isRequired: required,
            placeholder,
        },
        state,
    );

    const handleClearClick = useCallback(() => {
        state.setInputValue('');
        setSelectedKey('');
        send({ type: 'CLEARING', data: { query: '' } });
    }, [send, state]);

    const handleDropdownOpen = () => {
        send('OPEN_DROPDOWN');
        openBoxState(state);
    };

    const handleWrapperClick = () => {
        if (document.activeElement !== inputRef.current) {
            inputRef.current?.focus();
        }
        handleDropdownOpen();
    };

    const handleWrapperMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        if (matches(LinkChooserState.Focused) && event.target !== inputRef.current) {
            event.preventDefault();
        }
    };

    const handleDropdownClose = () => {
        let selectedResult = null;
        if (context.query) {
            if (queryMatchesSelection(context.selectedResult, context.query)) {
                selectedResult = context.selectedResult;
            } else {
                selectedResult = createCustomLink(state.inputValue);
            }
        }
        send({ type: 'CLOSE_DROPDOWN', data: { selectedResult } });
        if (selectedResult && selectedKey !== selectedResult.id) {
            setSelectedKey(selectedResult.id);
        }
        closeBoxState(state);
    };

    const manualInputProps = useManualComboBoxEventHandlers(
        { inputProps, inputRef, popoverRef, state },
        {
            onOpen: handleDropdownOpen,
            onClose: handleDropdownClose,
            onNavigate: (id) => {
                if (isDefault) {
                    send({
                        type: 'SELECT_EXTRA_SECTION',
                        data: {
                            getExtraResultsByQuery: findSection(extraSections, id)?.getResults || null,
                            currentSectionId: id.toString(),
                        },
                    });
                } else {
                    send({
                        type: 'BACK_TO_DEFAULT',
                        data: { getExtraResultsByQuery: null },
                    });
                }
            },
            onSelect: handleSelectionChange,
        },
    );

    useEffect(() => {
        if (isLoaded(matches) && context.interruptedFetch) {
            send({ type: 'TYPING', data: { query: context.query } });
        }
    }, [context.interruptedFetch, context.query, matches, send, value]);

    const { maxHeight } = useDropdownAutoHeight(inputRef, {
        isOpen: matches(LinkChooserState.Focused),
        autoResize: true,
    });

    const {
        isOpen,
        selectionManager: { focusedKey },
    } = state;

    useEffect(() => {
        if (focusedKey && popoverRef.current && isOpen) {
            const dropdownItem = popoverRef.current.querySelector(`[data-key="${focusedKey}"]`);
            if (dropdownItem) {
                scrollIntoView(popoverRef.current, dropdownItem as HTMLElement);
            }
        }
    }, [focusedKey, isOpen]);

    const [flyoutWidth, setFlyoutWidth] = useState(0);

    const calcFlyoutWidth = () => {
        setFlyoutWidth(triggerRef.current?.getBoundingClientRect().width || 0);
    };

    useEffect(() => {
        calcFlyoutWidth();
        window.addEventListener('resize', calcFlyoutWidth, false);
    }, []);

    return (
        <div data-test-id={dataTestId} ref={triggerRef} className="tw-w-full tw-font-sans tw-text-s">
            {!!label && (
                <label
                    {...labelProps}
                    data-test-id={`${dataTestId}-label`}
                    className="tw-text-black-80 tw-mb-1 tw-flex tw-align-items-center"
                >
                    {label}
                    {required && (
                        <span
                            data-test-id={`${dataTestId}-label-required`}
                            className="tw-h-4 tw-text-m tw-text-red-60 dark:tw-text-red-50 tw-ml-1"
                        >
                            *
                        </span>
                    )}
                </label>
            )}
            <SearchInput
                ariaProps={manualInputProps}
                selectedResult={context.selectedResult}
                ref={inputRef}
                disabled={disabled}
                decorator={IconOptions[context.selectedResult?.icon || DEFAULT_ICON]}
                clearable={clearable}
                onClear={handleClearClick}
                machineService={service}
                validation={validation}
                onClick={handleWrapperClick}
                onMouseDown={handleWrapperMouseDown}
            />
            <AnimatePresence>
                {matches(LinkChooserState.Focused) && (
                    <motion.div
                        style={{
                            width: flyoutWidth,
                        }}
                        className="tw-absolute tw-left-auto tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-20"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98], duration: 0.5 }}
                        data-test-id={`${dataTestId}-dropdown`}
                    >
                        <DismissButton onDismiss={handleDropdownClose} />
                        <Popover
                            popoverRef={popoverRef}
                            isOpen={matches(LinkChooserState.Focused)}
                            onClose={handleDropdownClose}
                            maxHeight={`${maxHeight.toBottom}px`}
                        >
                            <SearchResultsList
                                {...listBoxProps}
                                listBoxRef={listBoxRef}
                                state={state}
                                menuBlocks={searchResultMenuBlocks}
                                border={false}
                                machineService={service}
                            />
                            <div data-test-id={`${dataTestId}-action-menu`} className="tw-border-t tw-border-black-10">
                                <NavigationMenu machineService={service} state={state} />
                            </div>
                        </Popover>
                        <DismissButton onDismiss={handleDropdownClose} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="tw-my-2" data-test-id={`${dataTestId}-new-tab`}>
                <Checkbox
                    value="new-tab"
                    disabled={disabled}
                    state={openInNewTab ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={onOpenInNewTabChange}
                    label="Open in New Tab"
                />
            </div>
        </div>
    );
};
