/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { act, renderHook } from '@testing-library/react';
import { describe, it } from 'vitest';

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
    it('returns menu slots', () => {
        const { result } = renderHook(() => useSelectData(menuSlot));
        console.log(result);
    });
    it('returns decorator slots', () => {
        const { result } = renderHook(() => useSelectData(decoratorsSlot));
        console.log(result);
    });
    it('returns clear slot', () => {
        const { result } = renderHook(() => useSelectData(clearSlot));
        console.log(result);
    });
    it('returns default item', () => {
        const { result } = renderHook(() => useSelectData(menuSlot, 'test3'));
        console.log(result);
    });
    it('returns handles filterText', () => {
        const { result } = renderHook(() => useSelectData(menuSlot));
        act(() => {
            result.current.setFilterText('test1');
        });
        console.log(result);
    });
});
