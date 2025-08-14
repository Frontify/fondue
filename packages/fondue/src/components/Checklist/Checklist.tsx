/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCheckboxGroup, useCheckboxGroupItem } from '@react-aria/checkbox';
import { type CheckboxGroupState, useCheckboxGroupState } from '@react-stately/checkbox';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Checkbox, type CheckboxProps, CheckboxState } from '@components/Checkbox/Checkbox';
import { merge } from '@utilities/merge';

export enum ChecklistDirection {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
}

export type Columns = 1 | 2 | 3 | 4;

const columnsStyle: Record<Columns, string> = {
    1: 'tw-grid-cols-1',
    2: 'tw-grid-cols-2',
    3: 'tw-grid-cols-3',
    4: 'tw-grid-cols-4',
};

export type CheckboxValue = Omit<CheckboxProps, 'onChange' | 'groupInputProps' | 'value'> & { value: string };

export type ChecklistBase = {
    checkboxes: CheckboxValue[];
    setActiveValues: (value: string[]) => void;
    activeValues?: string[];
    ariaLabel?: string;
    'data-test-id'?: string;
};

export type ChecklistProps = ChecklistBase & {
    direction: ChecklistDirection.Vertical | ChecklistDirection.Horizontal;
    columns?: Columns;
};

type ChecklistItemProps = {
    checkbox: CheckboxValue;
    state: CheckboxGroupState;
    forwardedRef?: (ref: HTMLInputElement) => void;
};

const ChecklistItem = ({ checkbox, state, forwardedRef }: ChecklistItemProps) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const { value, disabled, label, 'aria-label': checkboxAriaLabel, state: checkboxState } = checkbox;
    const [checkState, setCheckState] = useState(checkboxState);
    const isSelected = state.isSelected(value);
    const { inputProps } = useCheckboxGroupItem(
        { value, isDisabled: disabled, 'aria-label': checkboxAriaLabel || label },
        state,
        ref,
    );

    useEffect(() => {
        if (checkState === CheckboxState.Mixed && !isSelected) {
            setCheckState(CheckboxState.Mixed);
        } else {
            setCheckState(isSelected ? CheckboxState.Checked : CheckboxState.Unchecked);
        }
    }, [checkState, isSelected]);

    useEffect(() => {
        if (forwardedRef && ref.current) {
            forwardedRef(ref.current);
        }
    }, [forwardedRef, isSelected]);

    return <Checkbox {...checkbox} state={checkState} groupInputProps={inputProps} ref={ref} />;
};

const getLastItemColumnSpan = (items: CheckboxValue[], columns: number) => {
    if (!columns || columns <= 1) {
        return '';
    }

    const gridSpan = 'auto / span';
    const spanItems = items.length % columns;

    if (spanItems === 0) {
        return '';
    }

    return `${gridSpan} ${columns - spanItems + 1}`;
};

export const Checklist = ({
    checkboxes,
    setActiveValues,
    ariaLabel = 'Checklist',
    activeValues = [],
    direction = ChecklistDirection.Horizontal,
    'data-test-id': dataTestId = 'checklist',
    ...props
}: ChecklistProps) => {
    const checkboxRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: checkboxes.length }));
    const listContainerRef = useRef<HTMLDivElement | null>(null);
    const state = useCheckboxGroupState({
        value: activeValues,
        onChange: setActiveValues,
    });
    const { groupProps } = useCheckboxGroup(
        {
            'aria-label': ariaLabel,
        },
        state,
    );

    const columns = ('columns' in props && props.columns) || 1;

    useLayoutEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const focusableElements = checkboxRefs.current.filter((el) => el !== null);
            const currentIndex = focusableElements.indexOf(document.activeElement as HTMLInputElement);
            let nextIndex = currentIndex;

            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                nextIndex++;
                if (nextIndex === focusableElements.length) {
                    nextIndex = 0;
                }
                if (focusableElements[nextIndex].disabled) {
                    nextIndex++;
                }
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                nextIndex--;
                if (nextIndex === -1) {
                    nextIndex = focusableElements.length - 1;
                }

                if (focusableElements[nextIndex].disabled) {
                    nextIndex--;
                }
            } else {
                return;
            }

            focusableElements[nextIndex].focus();

            const tabEvent = new KeyboardEvent('keyup', {
                key: 'Tab',
                code: 'Tab',
                keyCode: 9,
                bubbles: true,
            });

            focusableElements[nextIndex].dispatchEvent(tabEvent);
        };

        const listElem = listContainerRef.current;
        listElem?.addEventListener('keydown', handleKeyDown);

        return () => {
            listElem?.removeEventListener('keydown', handleKeyDown);
        };
    }, [checkboxes.length]);

    return (
        <div
            {...groupProps}
            data-test-id={dataTestId}
            className={merge([
                direction === ChecklistDirection.Horizontal
                    ? 'tw-flex tw-flex-row tw-gap-12'
                    : `tw-grid tw-gap-4 ${columnsStyle[columns]}`,
            ])}
            ref={listContainerRef}
        >
            {checkboxes.map((checkbox, index) => (
                <div
                    key={checkbox.value}
                    style={{
                        maxWidth: listContainerRef?.current?.getBoundingClientRect().width,
                        gridColumn:
                            index === checkboxes.length - 1 && direction === ChecklistDirection.Vertical
                                ? getLastItemColumnSpan(checkboxes, columns)
                                : undefined,
                    }}
                >
                    <ChecklistItem
                        checkbox={checkbox}
                        state={state}
                        forwardedRef={(el) => (checkboxRefs.current[index] = el)}
                    />
                </div>
            ))}
        </div>
    );
};

/**
 * @deprecated Use multiple `Checkbox` components from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#checklist the migration guide}.
 */
Checklist.displayName = 'FondueChecklist';
