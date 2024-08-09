/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { act, renderHook } from '@testing-library/react';
import { Children, isValidElement } from 'react';
import { describe, expect, it } from 'vitest';

import { Select } from '../Select';
import { getRecursiveOptionValues, useSelectData } from '../useSelectData';

describe('useSelectData', () => {
    const menuSlot = (
        <Select.Slot key="test" name="menu">
            <Select.Item value="test1">Test1</Select.Item>
            <Select.Item value="test2">Test2</Select.Item>
            <Select.Group groupId="Group 1">
                <Select.Item value="test3">Test3</Select.Item>
                <Select.Item value="test4">Test4</Select.Item>
                <Select.Item value="test5">Test5</Select.Item>
            </Select.Group>
            <Select.Item value="test6">Test6</Select.Item>
        </Select.Slot>
    );

    const decoratorsSlot = [
        <Select.Slot key="test-left" name="left">
            <IconIcon size={16} />
        </Select.Slot>,
        <Select.Slot key="test-right" name="right">
            <IconIcon size={16} />
        </Select.Slot>,
    ];

    const clearSlot = (
        <Select.Slot key="test-clear" name="clear">
            <IconIcon size={16} />
        </Select.Slot>
    );

    const selectSlots = [menuSlot, clearSlot, ...decoratorsSlot];

    it('returns menu slots', () => {
        const {
            result: { current: result },
        } = renderHook(() => useSelectData(selectSlots));

        expect(
            Children.toArray(result.menuSlots).every((item) => {
                return isValidElement(item) && (item.type === Select.Item || item.type === Select.Group);
            }),
        ).toBe(true);

        expect(Children.toArray(result.menuSlots).length).toBe(4);
        expect(result.filteredItems.length).toBe(6);
    });

    it('returns decorator slots', () => {
        const {
            result: { current: result },
        } = renderHook(() => useSelectData(selectSlots));

        expect(
            result.inputSlots.every((decorator) => {
                return isValidElement(decorator) && decorator.type === Select.Slot;
            }),
        ).toBe(true);

        expect(result.inputSlots.length).toBe(2);
    });

    it('returns clear slot', () => {
        const {
            result: { current: result },
        } = renderHook(() => useSelectData(selectSlots));

        expect(isValidElement(result.clearButton) && result.clearButton.type === Select.Slot).toBe(true);
    });

    it('returns item from value', () => {
        const {
            result: { current: result },
        } = renderHook(() => useSelectData(menuSlot));

        expect(result.getItemByValue('test1')).toEqual({
            value: 'test1',
            label: 'Test1',
        });
    });

    it('returns handles filterText', () => {
        const { result } = renderHook(() => useSelectData(menuSlot));

        expect(result.current.filterText).toBe('');
        expect(result.current.filteredItems.length).toBe(6);

        act(() => {
            result.current.setFilterText('test1');
        });

        expect(result.current.filterText).toBe('test1');
        expect(result.current.filteredItems.length).toBe(1);
    });
});

describe('getRecursiveOptionValues', () => {
    const menuSlot = (
        <Select.Slot key="test" name="menu">
            <Select.Item value="test1">Test1</Select.Item>
            <Select.Item value="test2">Test2</Select.Item>
            <Select.Group groupId="Group 1">
                <Select.Item value="test3">Test3</Select.Item>
                <Select.Item value="test4">Test4</Select.Item>
                <Select.Item value="test5">Test5</Select.Item>
            </Select.Group>
            <Select.Item value="test6">Test6</Select.Item>
        </Select.Slot>
    );

    it('returns item values for each item', () => {
        const result = getRecursiveOptionValues(menuSlot);
        expect(result.length).toBe(6);
    });

    it('returns correct values', () => {
        const result = getRecursiveOptionValues(menuSlot);
        const expectedValues = [
            { value: 'test1', label: 'Test1' },
            { value: 'test2', label: 'Test2' },
            { value: 'test3', label: 'Test3' },
            { value: 'test4', label: 'Test4' },
            { value: 'test5', label: 'Test5' },
            { value: 'test6', label: 'Test6' },
        ];

        expect(result).toEqual(expectedValues);
    });
});
