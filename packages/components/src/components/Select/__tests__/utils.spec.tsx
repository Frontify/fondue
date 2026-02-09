/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '#/components/Select';
import { type SelectItemProps } from '#/components/Select/components/SelectItem';

import { getSelectOptionValue, isReactLeaf, recursiveMap } from '../utils';

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
