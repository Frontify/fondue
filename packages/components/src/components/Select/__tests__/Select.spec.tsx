/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { act, renderHook } from '@testing-library/react';
import { Children, isValidElement } from 'react';
import { describe, expect, it } from 'vitest';

import { Select } from '../Select';
import { useSelectData } from '../useSelectData';

describe('useSelectData', () => {
    const menuSlot = [
        <Select.Slot key="test" name="menu">
            <Select.Item value="test1">Test1</Select.Item>
            <Select.Item value="test2">Test2</Select.Item>
            <Select.Group groupId="Group 1">
                <Select.Item value="test3">Test3</Select.Item>
                <Select.Item value="test4">Test4</Select.Item>
                <Select.Item value="test5">Test5</Select.Item>
            </Select.Group>
            <Select.Item value="test6">Test6</Select.Item>
        </Select.Slot>,
    ];
    const decoratorsSlot = [
        <Select.Slot key="test-left" name="left">
            <IconIcon size={16} />
        </Select.Slot>,
        <Select.Slot key="test-right" name="right">
            <IconIcon size={16} />
        </Select.Slot>,
    ];
    const clearSlot = [
        <Select.Slot key="test-clear" name="clear">
            <IconIcon size={16} />
        </Select.Slot>,
    ];
    const selectSlots = [...menuSlot, ...decoratorsSlot, ...clearSlot];

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
        act(() => {
            result.current.setFilterText('test1');
        });
        expect(result.current.filterText).toBe('test1');
    });
});
