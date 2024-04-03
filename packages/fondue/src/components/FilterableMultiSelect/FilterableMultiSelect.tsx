/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useButton } from '@react-aria/button';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import {
    type KeyboardEvent,
    type ReactElement,
    type ReactNode,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { usePopper } from 'react-popper';

import { CheckboxState } from '@components/Checkbox/Checkbox';
import { Checklist, ChecklistDirection } from '@components/Checklist/Checklist';
import { Tag, TagSize, TagType } from '@components/Tag';
import { TextInput } from '@components/TextInput';
import { Trigger, TriggerEmphasis } from '@components/Trigger';
import { DEFAULT_DROPDOWN_MAX_HEIGHT, useDropdownAutoHeight } from '@hooks/useDropdownAutoHeight';
import { Text } from '@typography/Text';
import { EnablePortalWrapper } from '@utilities/dialogs/EnablePortalWrapper';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';

import { getPaddingClasses, useClickOutside } from './helpers';

export enum FilterableMultiSelectType {
    Default = 'Default',
    Summarized = 'Summarized',
}

export enum FilterableMultiSelectSize {
    Small = 'Small',
    Medium = 'Medium',
}

export type FilterableMultiSelectItem = {
    value: string;
    isCategory?: boolean;
    isDivider?: boolean;
    avatar?: ReactNode;
    imgSrc?: string;
    ariaLabel?: string;
};

export type FilterableMultiSelectProps = {
    items: FilterableMultiSelectItem[];
    activeItemKeys: (string | number)[];
    disabled?: boolean;
    onSelectionChange: (keys: (string | number)[]) => void;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    type?: FilterableMultiSelectType;
    size?: FilterableMultiSelectSize;
    validation?: Validation;
    summarizedLabel?: string;
    indeterminateItemKeys?: (string | number)[];
    flip?: boolean;
    emphasis?: TriggerEmphasis;
    enablePortal?: boolean;
    filterLabel?: string;
    emptyFilteredResultsLabel?: string;
};

type FilterableMultiSelectCheckboxItem = {
    label: string;
    value: string;
    avatar?: ReactNode;
    isCategory?: boolean;
    isDivider?: boolean;
    imgSrc?: string;
    ariaLabel?: string;
};

export const FilterableMultiSelect = ({
    items,
    activeItemKeys,
    onSelectionChange,
    ariaLabel = 'Select list',
    disabled = false,
    placeholder,
    label,
    type = FilterableMultiSelectType.Default,
    size = FilterableMultiSelectSize.Medium,
    validation = Validation.Default,
    summarizedLabel: summarizedLabelFromProps,
    indeterminateItemKeys,
    flip = false,
    emphasis = TriggerEmphasis.Default,
    enablePortal = true,
    filterLabel,
    emptyFilteredResultsLabel,
}: FilterableMultiSelectProps): ReactElement => {
    const [open, setOpen] = useState(false);
    const [checkboxes, setCheckboxes] = useState<FilterableMultiSelectCheckboxItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const multiSelectRef = useRef<HTMLDivElement | null>(null);
    const [multiSelectMenuRef, setMultiSelectMenuRef] = useState<null | HTMLDivElement>(null);
    const [triggerRef, setTriggerRef] = useState<HTMLDivElement | null>(null);

    const { isFocusVisible, focusProps } = useFocusRing();

    const { maxHeight } = useDropdownAutoHeight({ current: triggerRef }, { isOpen: open, autoResize: true });

    const hasSelectedItems = activeItemKeys.length > 0;
    const summarizedLabel = summarizedLabelFromProps ?? [activeItemKeys.length, 'selected'].join(' ');

    const handleClose = () => setOpen(false);

    useClickOutside(null, handleClose, [multiSelectRef?.current as HTMLElement, multiSelectMenuRef as HTMLElement]);

    const heightIsReady = maxHeight !== DEFAULT_DROPDOWN_MAX_HEIGHT;

    const multiSelectContentId = useId();

    const toggleOpen = () => setOpen((open) => !open);

    const { buttonProps } = useButton(
        {
            onPress: toggleOpen,
            onKeyDown: (e) => {
                if (e.key === 'Escape') {
                    setOpen(false);
                }
            },
            elementType: 'div',
        },
        { current: triggerRef },
    );

    const toggleSelection = (key: string | number) => {
        const keySet = new Set(activeItemKeys);

        if (keySet.has(key)) {
            keySet.delete(key);
        } else {
            keySet.add(key);
        }

        onSelectionChange(Array.from(keySet));
    };

    const handleSpaceBarToggle = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Space') {
            toggleOpen();
        }
    };

    const getTagType = () => {
        if (!open) {
            return TagType.Selected;
        }
        return TagType.SelectedWithFocus;
    };

    useEffect(() => {
        setMultiSelectMenuRef(multiSelectRef?.current as HTMLDivElement);
    }, []);

    useEffect(() => {
        setCheckboxes(
            items.map((item) => {
                if (indeterminateItemKeys?.includes(item.value)) {
                    return { ...item, label: item.value, state: CheckboxState.Mixed };
                }

                return { ...item, label: item.value };
            }),
        );
    }, [items, indeterminateItemKeys]);

    const handleFilterChange = useCallback(
        (newValue: string) => {
            setSearchTerm(newValue);

            setCheckboxes(
                items.reduce((acc: FilterableMultiSelectCheckboxItem[], item) => {
                    if (
                        item.isCategory ||
                        item.isDivider ||
                        item.value.toLowerCase().includes(newValue.toLowerCase())
                    ) {
                        if (indeterminateItemKeys?.includes(item.value)) {
                            return [...acc, { ...item, label: item.value, state: CheckboxState.Mixed }];
                        }

                        return [...acc, { ...item, label: item.value }];
                    }
                    return acc;
                }, []),
            );
        },
        [indeterminateItemKeys, items],
    );

    useEffect(() => {
        !open && handleFilterChange('');
    }, [open, handleFilterChange]);

    const popperInstance = usePopper(triggerRef, multiSelectMenuRef, {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: 'flip',
                enabled: flip,
            },
        ],
    });

    useEffect(() => {
        const updatePopper = async () => {
            if (popperInstance.update) {
                await popperInstance.update();
            }
        };

        updatePopper().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeItemKeys]);

    return (
        <div className="tw-relative" ref={multiSelectRef}>
            <Trigger
                disabled={disabled}
                buttonProps={buttonProps}
                isFocusVisible={isFocusVisible}
                isOpen={open}
                validation={validation}
                emphasis={emphasis}
            >
                <div className={merge(['tw-flex tw-flex-1 tw-gap-2', getPaddingClasses(size)])} ref={setTriggerRef}>
                    <div
                        className="tw-flex tw-flex-1 tw-gap-2 focus:tw-outline-0"
                        onClick={toggleOpen}
                        role="combobox"
                        aria-expanded={open}
                        aria-controls={multiSelectContentId}
                        aria-label={ariaLabel}
                        {...focusProps}
                        tabIndex={0}
                        onKeyDown={handleSpaceBarToggle}
                    >
                        <div className="tw-flex tw-flex-wrap tw-gap-2 tw-outline-none tw-items-center tw-min-h-[28px]">
                            {label && hasSelectedItems && <Text weight="strong">{label}</Text>}
                            {type === FilterableMultiSelectType.Default &&
                                activeItemKeys.map((key) => (
                                    <Tag
                                        key={key}
                                        type={getTagType()}
                                        label={key.toString()}
                                        size={size === FilterableMultiSelectSize.Small ? TagSize.Small : TagSize.Medium}
                                        onClick={disabled ? undefined : () => toggleSelection(key)}
                                    />
                                ))}

                            {type === FilterableMultiSelectType.Summarized &&
                                (hasSelectedItems || summarizedLabelFromProps) && (
                                    <Tag
                                        type={getTagType()}
                                        label={summarizedLabel}
                                        size={size === FilterableMultiSelectSize.Small ? TagSize.Small : TagSize.Medium}
                                        onClick={
                                            indeterminateItemKeys?.length === 0
                                                ? () => onSelectionChange([])
                                                : undefined
                                        }
                                    />
                                )}

                            {activeItemKeys.length === 0 && placeholder && <Text color="weak">{placeholder}</Text>}
                        </div>
                    </div>
                </div>
            </Trigger>

            {open && heightIsReady && (
                <EnablePortalWrapper enablePortal={enablePortal}>
                    <div
                        id={multiSelectContentId}
                        ref={setMultiSelectMenuRef}
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-[120000] tw-bg-base tw-min-w-[18rem]"
                        key="content"
                        style={{
                            ...popperInstance.styles.popper,
                            width: triggerRef?.getBoundingClientRect().width,
                        }}
                        {...popperInstance.attributes.popper}
                    >
                        <FocusScope restoreFocus>
                            <div className="tw-p-4 tw-pb-0">
                                <TextInput
                                    value={searchTerm}
                                    placeholder={filterLabel}
                                    clearable={true}
                                    onChange={handleFilterChange}
                                    focusOnMount={true}
                                />
                            </div>
                            <div
                                className="tw-p-4 tw-overflow-y-auto tw-overflow-x-hidden tw-w-full tw-relative"
                                style={{ maxHeight }}
                            >
                                {checkboxes.length > 0 && (
                                    <Checklist
                                        activeValues={activeItemKeys.map((key) => key.toString())}
                                        setActiveValues={onSelectionChange}
                                        checkboxes={checkboxes.filter((item) => !item.isDivider && !item.isCategory)}
                                        direction={ChecklistDirection.Vertical}
                                        ariaLabel={ariaLabel}
                                    />
                                )}

                                {checkboxes.length === 0 && searchTerm !== '' && (
                                    <Text size="small" color="weak">
                                        {emptyFilteredResultsLabel}
                                    </Text>
                                )}
                            </div>
                        </FocusScope>
                    </div>
                </EnablePortalWrapper>
            )}
        </div>
    );
};
FilterableMultiSelect.displayName = 'FondueFilterableMultiSelect';
