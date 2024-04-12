/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HierarchyNode } from 'd3-hierarchy';
import { describe, expect, it } from 'vitest';

import { type TreemapDataPoint, type TreemapDataPointGroup } from '../../../types';

import { getTooltipEntries } from './getTooltipEntries';

describe('getTooltipEntries', () => {
    it('returns only top level node if active node is top level node', () => {
        const activeNode = {
            depth: 1,
            data: {
                label: 'Top Level Node',
                value: 100,
            },
        } as HierarchyNode<TreemapDataPoint>;
        const result = getTooltipEntries(activeNode, activeNode.data, 'Missing Value', 'Total');
        expect(result).toEqual([{ title: 'Total', value: 100, color: '' }]);
    });

    it('returns top level node and active node if active node is not top level node', () => {
        const topLevelNode = {
            label: 'Top Level Node',
            value: 100,
        } as TreemapDataPoint;
        const activeNode = {
            depth: 2,
            data: {
                label: 'Active Node',
                value: 50,
            },
        } as HierarchyNode<TreemapDataPoint>;
        const result = getTooltipEntries(activeNode, topLevelNode, 'Missing Value', 'Total');
        expect(result).toEqual([
            { title: 'Total', value: 100, color: '' },
            { title: 'Active Node', value: 50, color: 'transparent', typeByGrouping: '', type: '' },
        ]);
    });

    it('uses valueFormatter if available', () => {
        const topLevelNode = {
            label: 'Top Level Node',
            value: 100,
        } as TreemapDataPoint;

        const activeNode = {
            depth: 2,
            data: {
                label: 'Active Node',
                value: 50,
                color: 'red',
            },
        } as HierarchyNode<TreemapDataPoint>;

        const valueFormatter = (value: number) => `${value} CHF`;

        const result = getTooltipEntries(activeNode, topLevelNode, 'Missing Value', 'Total', valueFormatter);
        expect(result).toEqual([
            { title: 'Total', value: '100 CHF', color: '' },
            { title: 'Active Node', value: '50 CHF', color: 'red', typeByGrouping: '', type: '' },
        ]);
    });

    it('uses missingValueLabel if value is null', () => {
        const topLevelNode = {
            label: 'Top Level Node',
            value: null,
        } as TreemapDataPoint;

        const activeNode = {
            depth: 2,
            data: {
                label: 'Active Node',
                value: null,
                color: 'red',
            },
        } as HierarchyNode<TreemapDataPoint>;

        const valueFormatter = (value: number) => `${value} CHF`;

        const result = getTooltipEntries(activeNode, topLevelNode, 'Missing Value', 'Total', valueFormatter);
        expect(result).toEqual([
            { title: 'Total', value: 'Missing Value', color: '' },
            { title: 'Active Node', value: 'Missing Value', color: 'red', typeByGrouping: '', type: '' },
        ]);
    });

    const topLevelNode = {
        label: 'Top Level Node',
        value: null,
    } as TreemapDataPoint;

    const valueFormatter = (value: number) => `${value} CHF`;

    const colorLabelMap = {
        transparent: { singular: '', plural: '', group: (brands: number) => `Others (${brands} brands)` },
        PRIMARY: {
            singular: 'Library',
            plural: 'Libraries',
            group: (libraries: number) => `Others (${libraries} libraries)`,
        },
        SECONDARY: {
            singular: 'Project',
            plural: 'Projects',
            group: (projects: number) => `Others (${projects} projects)`,
        },
        TERTIARY: {
            singular: 'Guideline',
            plural: 'Guidelines',
            group: (guidelines: number) => `Others (${guidelines} guidelines)`,
        },
    };

    it('should return correct labels for primary color according to colorLabelMap', () => {
        const activeNode = {
            depth: 2,
            data: {
                label: 'Active Node',
                value: null,
                color: 'PRIMARY',
                id: 'group-PRIMARY',
                groupIds: ['1', '2'],
            },
        } as HierarchyNode<TreemapDataPointGroup>;
        const result = getTooltipEntries(
            // @ts-expect-error Wrong typing in the original code
            activeNode,
            topLevelNode,
            'Missing Value',
            'Total',
            valueFormatter,
            colorLabelMap,
        );
        expect(result).toEqual([
            { title: 'Total', value: 'Missing Value', color: '' },
            {
                title: 'Active Node',
                value: 'Missing Value',
                color: 'var(--fc-primary-base-color)',
                typeByGrouping: 'Libraries',
                type: 'Library',
            },
        ]);
    });
    it('should return correct labels for secondary color according to colorLabelMap', () => {
        const activeNode = {
            depth: 2,
            data: {
                label: 'Active Node',
                value: null,
                color: 'SECONDARY',
                id: 'group-SECONDARY',
                groupIds: ['1', '2'],
            },
        } as HierarchyNode<TreemapDataPointGroup>;

        const result = getTooltipEntries(
            // @ts-expect-error Wrong typing in the original code
            activeNode,
            topLevelNode,
            'Missing Value',
            'Total',
            valueFormatter,
            colorLabelMap,
        );
        expect(result).toEqual([
            { title: 'Total', value: 'Missing Value', color: '' },
            {
                title: 'Active Node',
                value: 'Missing Value',
                color: 'var(--fc-secondary-base-color)',
                typeByGrouping: 'Projects',
                type: 'Project',
            },
        ]);
    });
    it('should return correct labels for tertiary color according to colorLabelMap', () => {
        const activeNode = {
            depth: 2,
            data: {
                label: 'Active Node',
                value: null,
                color: 'TERTIARY',
                id: 'group-TERTIARY',
                groupIds: ['1', '2'],
            },
        } as HierarchyNode<TreemapDataPointGroup>;

        const result = getTooltipEntries(
            // @ts-expect-error Wrong export of types
            activeNode,
            topLevelNode,
            'Missing Value',
            'Total',
            valueFormatter,
            colorLabelMap,
        );
        expect(result).toEqual([
            { title: 'Total', value: 'Missing Value', color: '' },
            {
                title: 'Active Node',
                value: 'Missing Value',
                color: 'var(--fc-tertiary-base-color)',
                typeByGrouping: 'Guidelines',
                type: 'Guideline',
            },
        ]);
    });
    it('should not return plural labels for non grouped datapoints', () => {
        const activeNode = {
            depth: 2,
            data: {
                label: 'Active Node',
                value: null,
                color: 'TERTIARY',
                id: 'TERTIARY',
            },
        } as HierarchyNode<TreemapDataPoint>;
        const result = getTooltipEntries(
            activeNode,
            topLevelNode,
            'Missing Value',
            'Total',
            valueFormatter,
            colorLabelMap,
        );
        expect(result).toEqual([
            { title: 'Total', value: 'Missing Value', color: '' },
            {
                title: 'Active Node',
                value: 'Missing Value',
                color: 'var(--fc-tertiary-base-color)',
                typeByGrouping: 'Guideline',
                type: 'Guideline',
            },
        ]);
    });

    it('should not return plural labels for single grouped datapoints', () => {
        const activeNode = {
            depth: 2,
            data: {
                label: 'Active Node',
                value: null,
                color: 'TERTIARY',
                id: 'group-TERTIARY',
                groupIds: ['1'],
            },
        } as HierarchyNode<TreemapDataPointGroup>;

        const result = getTooltipEntries(
            // @ts-expect-error Wrong export of types
            activeNode,
            topLevelNode,
            'Missing Value',
            'Total',
            valueFormatter,
            colorLabelMap,
        );

        expect(result).toEqual([
            { title: 'Total', value: 'Missing Value', color: '' },
            {
                title: 'Active Node',
                value: 'Missing Value',
                color: 'var(--fc-tertiary-base-color)',
                typeByGrouping: 'Guideline',
                type: 'Guideline',
            },
        ]);
    });
});
