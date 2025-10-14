/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { ParentSize } from '@visx/responsive';
import { useState } from 'react';

import { type TreemapProps } from '@components/Treemap/types';

import { Treemap } from './Treemap';
import { BIG_DATASET, MEDIUM_DATASET } from './data';

export default {
    title: 'Charts/Treemap',
    component: Treemap,
    parameters: {
        status: {
            type: 'released',
        },
    },
    description:
        'Displays a two-dimensional tree of data as a set of nested rectangles. Supports two levels of nesting (parent and child).',
    argTypes: {
        data: {
            name: 'data',
            type: { name: 'other', value: 'TreemapDataPoint[]', required: true },
            description:
                'An array of data to be displayed in the chart. Should include a root node with `parent: null`. The root node is not displayed. Only two levels of nesting are supported (excluding the root node).',
        },
        childSumLabel: {
            name: 'childSumLabel',
            type: { name: 'string', required: true },
            description: 'Label for the sum of all children of a first-level node',
        },
        missingValueLabel: {
            name: 'missingValueLabel',
            type: { name: 'string', required: false },
            description: 'The label to be displayed for missing values. E.g. "No data".',
            defaultValue: '-',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '-' },
            },
        },
        valueFormatter: {
            name: 'valueFormatter',
            type: { name: 'other', value: '(value: number) => string', required: false },
            description: 'An optional function to format the displayed values (for example for adding units).',
        },
        width: {
            name: 'width',
            type: { name: 'other', value: 'width', required: true },
            description: 'Width of the chart in px.',
        },
        height: {
            name: 'height',
            type: { name: 'other', value: 'height', required: true },
            description: 'Height of the chart in px.',
        },
    },
} as Meta<TreemapProps>;

const brands = [
    { label: 'Brands', id: 'Brands', value: null, parentId: null },
    { label: 'Brand 1', id: 'Brand 1', value: 0, parentId: 'Brands', color: 'transparent' },
    { label: 'Brand 2', id: 'Brand 2', value: 0, parentId: 'Brands', color: 'transparent' },
    { label: 'Brand 3', id: 'Brand 3', value: 0, parentId: 'Brands', color: 'transparent' },
    { label: 'Brand 4', id: 'Brand 4', value: 0, parentId: 'Brands', color: 'transparent' },
    { label: 'Brand 5', id: 'Brand 5', value: 0, parentId: 'Brands', color: 'transparent' },
    { label: 'Brand 6', id: 'Brand 6', value: 0, parentId: 'Brands', color: 'transparent' },
    {
        label: 'guideline 1',
        id: 'guideline 1',
        value: 100,
        parentId: 'Brand 1',
        description: 'Brand: Brand 1',
        color: 'TERTIARY',
    },
    {
        label: 'guideline 2',
        id: 'guideline 2',
        value: 200,
        parentId: 'Brand 1',
        description: 'Brand: Brand 1',
        color: 'TERTIARY',
    },
    {
        label: 'guideline 3',
        id: 'guideline 3',
        value: 100,
        parentId: 'Brand 3',
        description: 'Brand: Brand 3',
        color: 'TERTIARY',
    },
    {
        label: 'guideline 5',
        id: 'guideline 5',
        value: 20,
        parentId: 'Brand 3',
        description: 'Brand: Brand 3',
        color: 'TERTIARY',
    },
    {
        label: 'guideline 4',
        id: 'guideline 4',
        value: 20,
        parentId: 'Brand 3',
        description: 'Brand: Brand 3',
        color: 'TERTIARY',
    },
    {
        label: 'guideline 6',
        id: 'guideline 6',
        value: 20,
        parentId: 'Brand 3',
        description: 'Brand: Brand 3',
        color: 'TERTIARY',
    },
    {
        label: 'guideline 4',
        id: 'guideline 4',
        value: 200,
        parentId: 'Brand 2',
        description: 'Brand: Brand 2',
        color: 'TERTIARY',
    },
    {
        label: 'library 1',
        id: 'library 1',
        value: 100,
        parentId: 'Brand 1',
        description: 'Brand: Brand 1',
        color: 'PRIMARY',
    },
    {
        label: 'library 2',
        id: 'library 2',
        value: 50,
        parentId: 'Brand 2',
        description: 'Brand: Brand 2',
        color: 'PRIMARY',
    },
    {
        label: 'project 1',
        id: 'project 1',
        value: 50,
        parentId: 'Brand 1',
        description: 'Brand: Brand 1',
        color: 'SECONDARY',
    },
    {
        label: 'library 3',
        id: 'library 3',
        value: 20,
        parentId: 'Brand 6',
        description: 'Brand: Brand 6',
        color: 'PRIMARY',
    },
    {
        label: 'project 2',
        id: 'project 2',
        value: 20,
        parentId: 'Brand 5',
        description: 'Brand: Brand 5',
        color: 'SECONDARY',
    },
    {
        label: 'guideline 7',
        id: 'guideline 7',
        value: 20,
        parentId: 'Brand 4',
        description: 'Brand: Brand 4',
        color: 'TERTIARY',
    },
];
const FixedSizeTemplate: StoryFn<TreemapProps> = (args) => (
    <div style={{ width: '700px', height: '500px' }}>
        <Treemap {...args} />
    </div>
);

export const StorageDistribution = FixedSizeTemplate.bind({});
StorageDistribution.args = {
    data: brands,
    childSumLabel: 'Brand',
    width: 700,
    height: 500,
    valueFormatter: (value: number) => `${value} GB`,
    legendItems: [
        { label: 'Library', color: 'PRIMARY' },
        { label: 'Project', color: 'SECONDARY' },
        { label: 'Guideline', color: 'TERTIARY' },
    ],
};

const FlexibleWidthTemplate: StoryFn<TreemapProps> = (args) => (
    <div style={{ width: '100%', height: '500px' }}>
        <Treemap {...args} />
    </div>
);

export const StorageDistributionWithFlexibleWidth = FlexibleWidthTemplate.bind({});
StorageDistributionWithFlexibleWidth.args = {
    data: brands,
    childSumLabel: 'Brand',
    valueFormatter: (value: number) => `${value} MB`,
    width: 700,
    height: 500,
};

const ResponsiveWidthTemplate: StoryFn<TreemapProps> = (args) => {
    const [data, setData] = useState(BIG_DATASET);

    return (
        <>
            <button
                onClick={() => setData((data) => (data.length > MEDIUM_DATASET.length ? MEDIUM_DATASET : BIG_DATASET))}
            >
                {' '}
                change data
            </button>
            <ParentSize>
                {({ width, height }) => (
                    <div style={{ width, height: '700px' }}>
                        <Treemap {...args} data={data} width={width} height={height} />
                    </div>
                )}
            </ParentSize>
        </>
    );
};

export const BigDatasetFlexibleWidth = ResponsiveWidthTemplate.bind({});
BigDatasetFlexibleWidth.args = {
    childSumLabel: 'Brand',
    valueFormatter: (value: number) => `${value} MB`,
    colorLabelMap: {
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
    },
};
