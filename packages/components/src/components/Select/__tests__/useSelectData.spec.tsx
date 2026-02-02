/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Children, isValidElement } from 'react';
import { describe, expect, it } from 'vitest';

import { Select } from '../SelectBase';
import { type AsyncItem, getRecursiveOptionValues, useSelectData } from '../hooks/useSelectData';

const getMockedGetAsyncItems =
    (shouldError: boolean = false) =>
    (filterText: string) => {
        return new Promise<AsyncItem[]>((resolve, reject) => {
            if (shouldError) {
                reject(new Error('Async fetch failed'));
            }
            const items = [
                { label: 'asynctest1', value: 'Async Test1' },
                { label: 'asynctest2', value: 'Async Test2' },
                { label: 'asynctest3', value: 'Async Test3' },
                { label: 'asynctest4', value: 'Async Test4' },
                { label: 'asynctest5', value: 'Async Test5' },
                { label: 'asynctest6', value: 'Async Test6' },
            ].filter((item) => item.label.toLowerCase().includes(filterText.toLowerCase()));

            resolve(items);
        });
    };

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
        expect(result.items.length).toBe(6);
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
        expect(result.current.items.length).toBe(6);

        act(() => {
            result.current.setFilterText('test1');
        });

        expect(result.current.filterText).toBe('test1');
        expect(result.current.items.length).toBe(1);
    });

    it('returns async items when filterText is empty', async () => {
        const getAsyncItems = getMockedGetAsyncItems(false);
        const { result } = renderHook(() => useSelectData([], getAsyncItems));

        expect(
            Children.toArray(result.current.menuSlots).every((item) => {
                return isValidElement(item) && (item.type === Select.Item || item.type === Select.Group);
            }),
        ).toBe(true);

        expect(result.current.asyncItemStatus.isLoading).toBe(true);
        expect(result.current.asyncItemStatus.error).toBe(null);

        await waitFor(() => {
            expect(result.current.asyncItemStatus.isLoading).toBe(false);
        });

        expect(Children.toArray(result.current.menuSlots).length).toBe(6);
        expect(result.current.items.length).toBe(6);
    });

    it('returns async items when filter text is set', async () => {
        const getAsyncItems = getMockedGetAsyncItems();
        const { result } = renderHook(() => useSelectData([], getAsyncItems));

        act(() => {
            result.current.setFilterText('2');
        });

        expect(result.current.asyncItemStatus.isLoading).toBe(true);
        expect(result.current.asyncItemStatus.error).toBe(null);

        await waitFor(() => {
            expect(result.current.asyncItemStatus.isLoading).toBe(false);
        });

        expect(result.current.items.length).toBe(1);
    });

    it('returns error status when getAsyncItems fails', async () => {
        const getAsyncItems = getMockedGetAsyncItems(true);
        const { result } = renderHook(() => useSelectData([], getAsyncItems));

        expect(result.current.asyncItemStatus.isLoading).toBe(true);
        expect(result.current.asyncItemStatus.error).toBe(null);

        await waitFor(() => {
            expect(result.current.asyncItemStatus.isLoading).toBe(false);
            expect(result.current.asyncItemStatus.error).not.toBe(null);
            expect(result.current.asyncItemStatus.error?.message).toBe('Async fetch failed');
        });

        expect(result.current.items.length).toBe(0);
    });

    it('returns async items mixed with sync items when no filterText is set', async () => {
        const getAsyncItems = getMockedGetAsyncItems();
        const { result } = renderHook(() => useSelectData([menuSlot], getAsyncItems));

        expect(result.current.asyncItemStatus.isLoading).toBe(true);
        expect(result.current.asyncItemStatus.error).toBe(null);

        expect(Children.toArray(result.current.menuSlots).length).toBe(4); // 6 sync menu slots
        expect(result.current.items.length).toBe(6); // 6 sync items

        await waitFor(() => {
            expect(result.current.asyncItemStatus.isLoading).toBe(false);
        });

        expect(Children.toArray(result.current.menuSlots).length).toBe(10); // 6 async items + 4 sync menu slots
        expect(result.current.items.length).toBe(12); // 6 async items + 6 sync items
    });

    it('returns async items mixed with sync items when filterText is set', async () => {
        const getAsyncItems = getMockedGetAsyncItems();
        const { result } = renderHook(() => useSelectData([menuSlot], getAsyncItems));

        await waitFor(() => {
            expect(result.current.asyncItemStatus.isLoading).toBe(false);
        });

        act(() => {
            result.current.setFilterText('test1');
        });

        expect(result.current.asyncItemStatus.isLoading).toBe(true);
        expect(result.current.asyncItemStatus.error).toBe(null);

        expect(result.current.items.length).toBe(7); // 1 sync item + 6 async items before async filtering is finished

        await waitFor(() => {
            expect(result.current.asyncItemStatus.isLoading).toBe(false);
        });

        expect(result.current.items.length).toBe(2); // 1 async item + 1 sync item matching filter
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
