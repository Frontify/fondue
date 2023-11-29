/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectItemProps } from '@components/SelectItem/SelectItem';
import { IconCaretDown16, IconCaretUp16 } from '@foundation/Icon';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap, validationTextClassMap } from '@utilities/validation';
import { useSelect } from 'downshift';
import { ReactElement, cloneElement, useEffect, useState } from 'react';
import { InputBaseProps } from 'src/types/input';

export type SelectProps = {
    children: ReactElement | ReactElement[];
    label: string;
    hiddenLabel?: boolean;
    listGroupTitle?: string;
    onChange?: (value: SelectItemProps) => void;
} & Omit<InputBaseProps<string>, 'autocomplete' | 'clearable' | 'decorator' | 'suffix'>;

export const Select = ({
    children,
    label,
    hiddenLabel = false,
    listGroupTitle = 'Select a option',
    status = Validation.Default,
    onChange,
    'data-test-id': dataTestId = 'fondue-select',
}: SelectProps) => {
    const [selectedItem, setSelectedItem] = useState<SelectItemProps | null | undefined>(undefined);

    const handleOnChange = (newSelectedItem: SelectItemProps) => {
        setSelectedItem(newSelectedItem);
    };

    const childrenToArray = (): Pick<SelectItemProps, 'id' | 'value' | 'title' | 'index'>[] => {
        const childrenPropArray = [];
        if (Array.isArray(children)) {
            for (const element of children) {
                for (const child of element.props.children) {
                    const { id, value, title, index } = child.props;
                    childrenPropArray.push({ id, value, title, index });
                }
            }
        } else {
            for (const child of children.props.children) {
                const { id, value, title, index } = child.props;
                childrenPropArray.push({ id, value, title, index });
            }
        }
        return childrenPropArray;
    };

    const { isOpen, highlightedIndex, getToggleButtonProps, getLabelProps, getMenuProps, getItemProps } =
        useSelect<SelectItemProps>({
            items: childrenToArray(),
            selectedItem,
            onSelectedItemChange: ({ selectedItem: newSelectedItem }) => setSelectedItem(newSelectedItem),
        });

    useEffect(() => {
        if (selectedItem) {
            onChange?.(selectedItem);
        }
    }, [selectedItem, onChange]);

    const getSelectedText = () => {
        if (selectedItem) {
            return selectedItem.title ? selectedItem.title : selectedItem.value;
        }
        return listGroupTitle;
    };

    const renderChildren = () => {
        if (Array.isArray(children)) {
            const allGroups = [];
            for (const child of children) {
                allGroups.push(
                    cloneElement(child, {
                        getMenuProps: { ...getMenuProps() },
                        getItemProps: (item: SelectItemProps, index: number) => getItemProps({ item, index }),
                        selectedItemId: selectedItem?.id,
                        highlightedIndex,
                        onChange: handleOnChange,
                    }),
                );
            }
            return allGroups;
        } else {
            return cloneElement(children, {
                getMenuProps: { ...getMenuProps() },
                getItemProps: (item: SelectItemProps, index: number) => getItemProps({ item, index }),
                selectedItemId: selectedItem?.id,
                highlightedIndex,
                onChange: handleOnChange,
            });
        }
    };

    return (
        <div data-test-id={dataTestId}>
            <div className="tw-flex tw-flex-col tw-gap-1">
                {hiddenLabel ? null : <label {...getLabelProps()}>{label}</label>}
                <div
                    className={merge([
                        'tw-p-2 tw-bg-base tw-flex tw-justify-between tw-cursor-pointer tw-border tw-rounded tw-border-line-strong',
                        status === Validation.Default
                            ? ''
                            : `${validationClassMap[status]} ${validationTextClassMap[status]}`,
                    ])}
                    {...getToggleButtonProps()}
                >
                    <span className="tw-text-text">{getSelectedText()}</span>
                    <span className="tw-p-1">{isOpen ? <IconCaretUp16 /> : <IconCaretDown16 />}</span>
                </div>
            </div>
            {isOpen && (
                <div className={'tw-absolute tw-w-full tw-bg-base tw-mt-1 tw-shadow-md tw-h-auto tw-p-0 tw-z-10'}>
                    {renderChildren()}
                </div>
            )}
        </div>
    );
};
Select.displayName = 'FondueSelect';
