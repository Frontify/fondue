/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { act, renderHook } from '@testing-library/react';
import { Children, isValidElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '../Select';
import { type SelectItemProps } from '../SelectItem';
import { useSelectData } from '../useSelectData';
import { getSelectOptionValue, isReactLeaf, recursiveMap } from '../utils';

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

    it('returns default item', () => {
        const {
            result: { current: result },
        } = renderHook(() => useSelectData(selectSlots, 'test3'));
        expect(result.defaultItem?.value).toBe('test3');
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
});

describe('getSelectOptionValue', () => {
    it('returns correct value and label for basic item', () => {
        const basicItem = <Select.Item value="test1">Test1</Select.Item>;
        const item = getSelectOptionValue(basicItem.props as SelectItemProps);
        expect(item.value).toBe('test1');
        expect(item.label).toBe('Test1');
    });

    it('returns correct value and label for item with label', () => {
        const basicItem = (
            <Select.Item value="test1" label="labelvalue">
                Test1
            </Select.Item>
        );
        const item = getSelectOptionValue(basicItem.props as SelectItemProps);
        expect(item.value).toBe('test1');
        expect(item.label).toBe('labelvalue');
    });

    it('returns correct value and label for item with child component', () => {
        const basicItem = (
            <Select.Item value="test1" label="labelvalue">
                <IconIcon />
            </Select.Item>
        );
        const item = getSelectOptionValue(basicItem.props as SelectItemProps);
        expect(item.value).toBe('test1');
        expect(item.label).toBe('labelvalue');
    });
});

describe('isReactLeaf', () => {
    it('returns if item with string is a react leaf', () => {
        const basicItem = <Select.Item value="test1">Test1</Select.Item>;
        const isLeaf = isReactLeaf(basicItem, Select.Item);
        expect(isLeaf).toBe(true);
    });
    it('returns if item with number is a react leaf', () => {
        const basicItem = <Select.Item value="test1">123</Select.Item>;
        const isLeaf = isReactLeaf(basicItem, Select.Item);
        expect(isLeaf).toBe(true);
    });
    it('returns if group with items is a react leaf', () => {
        const group = (
            <Select.Group groupId="testgroup">
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>;
            </Select.Group>
        );
        const isLeaf = isReactLeaf(group, Select.Group);
        expect(isLeaf).toBe(true);
    });
    it('returns if group with string is a react leaf', () => {
        const group = <Select.Group groupId="testgroup">ABC</Select.Group>;
        const isLeaf = isReactLeaf(group, Select.Group);
        expect(isLeaf).toBe(true);
    });
    it('returns if string is a react leaf', () => {
        const group = 'abc';
        const isLeaf = isReactLeaf(group, Select.Item);
        expect(isLeaf).toBe(false);
    });
});

describe('recursiveMap', () => {
    const menuSlot = (
        <Select.Slot key="test" name="menu">
            <Select.Item value="test1">Test1</Select.Item>
            <div>
                <Select.Item value="test2">Test2</Select.Item>
            </div>
            <Select.Group groupId="Group 1">
                <Select.Item value="test3">Test3</Select.Item>
                <Select.Item value="test4">Test4</Select.Item>
                <Select.Item value="test5">Test5</Select.Item>
            </Select.Group>
            <Select.Item value="test6">Test6</Select.Item>
        </Select.Slot>
    );

    it('returns calls parser for every item', () => {
        const mockCounter = vi.fn();
        recursiveMap(menuSlot, (child) => {
            mockCounter();
            return child;
        });
        expect(mockCounter).toHaveBeenCalledTimes(6);
    });
});
