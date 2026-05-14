/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp, IconImageStack, IconMusicNote, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { Dropdown } from '../Dropdown/Dropdown';
import { Flex } from '../Flex/Flex';

import { AssetInput, type AssetInputRootProps } from './AssetInput';

type StoryArgs = AssetInputRootProps & { acceptFileType: string };

const meta = {
    title: 'Components/AssetInput',
    tags: ['autodocs'],
    component: AssetInput.Root,
    subcomponents: {
        Placeholder: AssetInput.Placeholder,
        UploadInput: AssetInput.UploadInput,
        BrowseInput: AssetInput.BrowseInput,
        Preview: AssetInput.Preview,
        PreviewImage: AssetInput.PreviewImage,
        PreviewIcon: AssetInput.PreviewIcon,
        PreviewLoading: AssetInput.PreviewLoading,
        Title: AssetInput.Title,
        Metadata: AssetInput.Metadata,
    },
    argTypes: {
        acceptFileType: {
            control: { type: 'text' },
            description: 'File types accepted by the upload input.',
        },
        orientation: {
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
            description: 'The orientation of the asset input.',
        },
    },
    args: {
        acceptFileType: 'image/*',
        orientation: 'horizontal',
    },
    parameters: {
        controls: { include: ['acceptFileType', 'orientation'] },
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<StoryArgs>;

export const Placeholder: Story = {
    name: 'Placeholder',
    parameters: {
        controls: { include: ['acceptFileType'] },
    },
    render: ({ acceptFileType }) => (
        <AssetInput.Placeholder>
            <AssetInput.UploadInput acceptFileType={acceptFileType} onFileChange={action('onFileChange')} />
            <AssetInput.BrowseInput onBrowse={action('onBrowse')} />
        </AssetInput.Placeholder>
    ),
};

export const PlaceholderOnlyUpload: Story = {
    name: 'Placeholder - Upload Only',
    parameters: {
        controls: { include: ['acceptFileType'] },
    },
    render: ({ acceptFileType }) => (
        <AssetInput.Placeholder>
            <AssetInput.UploadInput acceptFileType={acceptFileType} onFileChange={action('onFileChange')} />
        </AssetInput.Placeholder>
    ),
};

export const PlaceholderOnlyBrowse: Story = {
    name: 'Placeholder - Browse Only',
    parameters: {
        controls: { include: [] },
    },
    render: () => (
        <AssetInput.Placeholder>
            <AssetInput.BrowseInput onBrowse={action('onBrowse')} />
        </AssetInput.Placeholder>
    ),
};

export const AssetInputRoot: Story = {
    name: 'Input - Single - Image',
    parameters: {
        controls: { include: ['orientation'] },
    },
    render: ({ orientation }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <AssetInput.Root orientation={orientation} isOpen={isOpen} onPress={() => setIsOpen(!isOpen)}>
                <AssetInput.Preview>
                    <AssetInput.PreviewImage src="https://picsum.photos/100/150" />
                </AssetInput.Preview>
                <AssetInput.Title>foo1</AssetInput.Title>
                <AssetInput.Metadata>
                    <Flex align="center" gap={0.5}>
                        <IconArrowCircleUp size="16" />
                        Uploaded
                    </Flex>
                </AssetInput.Metadata>
                <AssetInput.Metadata>JPG</AssetInput.Metadata>
                <AssetInput.Metadata>2000 bytes</AssetInput.Metadata>
            </AssetInput.Root>
        );
    },
};

export const AssetInputRootIcon: Story = {
    name: 'Input - Single - Icon',
    parameters: {
        controls: { include: ['orientation'] },
    },
    render: ({ orientation }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <AssetInput.Root orientation={orientation} isOpen={isOpen} onPress={() => setIsOpen(!isOpen)}>
                <AssetInput.Preview>
                    <AssetInput.PreviewIcon>
                        <IconMusicNote />
                    </AssetInput.PreviewIcon>
                </AssetInput.Preview>
                <AssetInput.Title>foo1</AssetInput.Title>
                <AssetInput.Metadata>
                    <Flex align="center" gap={0.5}>
                        <IconArrowCircleUp size="16" />
                        Uploaded
                    </Flex>
                </AssetInput.Metadata>
                <AssetInput.Metadata>JPG</AssetInput.Metadata>
                <AssetInput.Metadata>2000 bytes</AssetInput.Metadata>
            </AssetInput.Root>
        );
    },
};

export const AssetInputRootLoading: Story = {
    name: 'Input - Single - Loading',
    parameters: {
        controls: { include: ['orientation'] },
    },
    render: ({ orientation }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <AssetInput.Root orientation={orientation} isOpen={isOpen} onPress={() => setIsOpen(!isOpen)}>
                <AssetInput.Preview>
                    <AssetInput.PreviewLoading />
                </AssetInput.Preview>
                <AssetInput.Title>foo1</AssetInput.Title>
                <AssetInput.Metadata>
                    <Flex align="center" gap={0.5}>
                        <IconArrowCircleUp size="16" />
                        Uploaded
                    </Flex>
                </AssetInput.Metadata>
                <AssetInput.Metadata>JPG</AssetInput.Metadata>
                <AssetInput.Metadata>2000 bytes</AssetInput.Metadata>
            </AssetInput.Root>
        );
    },
};

export const AssetInputRootMultipleImages: Story = {
    name: 'Input - Multiple - Mixed',
    parameters: {
        controls: { include: ['orientation'] },
    },
    render: ({ orientation }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <AssetInput.Root orientation={orientation} isOpen={isOpen} onPress={() => setIsOpen(!isOpen)}>
                <AssetInput.Preview>
                    <AssetInput.PreviewImage src="https://picsum.photos/100/150" />
                    <AssetInput.PreviewImage src="https://picsum.photos/101/150" />
                    <AssetInput.PreviewIcon>
                        <IconMusicNote />
                    </AssetInput.PreviewIcon>
                    <AssetInput.PreviewLoading />
                </AssetInput.Preview>
                <AssetInput.Title>3 assets</AssetInput.Title>
                <AssetInput.Metadata>2 locations</AssetInput.Metadata>
            </AssetInput.Root>
        );
    },
};

export const AssetInputAsDropdownTrigger: Story = {
    name: 'Input as Dropdown Trigger',
    parameters: {
        controls: { include: ['orientation'] },
    },
    render: ({ orientation }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dropdown.Trigger asChild>
                    <AssetInput.Root orientation={orientation} isOpen={isOpen}>
                        <AssetInput.Preview>
                            <AssetInput.PreviewImage src="https://picsum.photos/100/150" />
                        </AssetInput.Preview>
                        <AssetInput.Title>foo1</AssetInput.Title>
                        <AssetInput.Metadata>
                            <Flex align="center" gap={0.5}>
                                <IconArrowCircleUp size="16" />
                                Uploaded
                            </Flex>
                        </AssetInput.Metadata>
                        <AssetInput.Metadata>JPG</AssetInput.Metadata>
                        <AssetInput.Metadata>2000 bytes</AssetInput.Metadata>
                    </AssetInput.Root>
                </Dropdown.Trigger>
                <Dropdown.Content align="start">
                    <Dropdown.Group>
                        <Dropdown.Item onSelect={action('replace')}>
                            <IconImageStack size={16} />
                            Replace with browse
                        </Dropdown.Item>
                        <Dropdown.Item onSelect={action('replace')}>
                            <IconArrowCircleUp size={16} />
                            Replace with upload
                        </Dropdown.Item>
                    </Dropdown.Group>
                    <Dropdown.Group>
                        <Dropdown.Item emphasis="danger" onSelect={action('remove')}>
                            <IconTrashBin size={16} />
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Group>
                </Dropdown.Content>
            </Dropdown.Root>
        );
    },
};
