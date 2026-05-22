/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp, IconImageStack, IconMusicNote, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useRef, useState } from 'react';
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
        'AssetInput.Placeholder': AssetInput.Placeholder,
        'AssetInput.UploadInput': AssetInput.UploadInput,
        'AssetInput.BrowseInput': AssetInput.BrowseInput,
        'AssetInput.Preview': AssetInput.Preview,
        'AssetInput.PreviewImage': AssetInput.PreviewImage,
        'AssetInput.PreviewIcon': AssetInput.PreviewIcon,
        'AssetInput.PreviewLoading': AssetInput.PreviewLoading,
        'AssetInput.Title': AssetInput.Title,
        'AssetInput.Metadata': AssetInput.Metadata,
        'AssetInput.MetadataItem': AssetInput.MetadataItem,
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
            <AssetInput.UploadInput acceptFileType={acceptFileType} onSelect={action('onFileChange')} />
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
            <AssetInput.UploadInput acceptFileType={acceptFileType} onSelect={action('onFileChange')} />
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
                    <AssetInput.MetadataItem>
                        <Flex align="center" gap={0.5}>
                            <IconArrowCircleUp size="16" />
                            Uploaded
                        </Flex>
                    </AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                </AssetInput.Metadata>
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
                    <AssetInput.MetadataItem>
                        <Flex align="center" gap={0.5}>
                            <IconArrowCircleUp size="16" />
                            Uploaded
                        </Flex>
                    </AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                </AssetInput.Metadata>
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
                    <AssetInput.MetadataItem>
                        <Flex align="center" gap={0.5}>
                            <IconArrowCircleUp size="16" />
                            Uploaded
                        </Flex>
                    </AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                </AssetInput.Metadata>
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
                <AssetInput.Metadata>
                    <AssetInput.MetadataItem>2 locations</AssetInput.MetadataItem>
                </AssetInput.Metadata>
            </AssetInput.Root>
        );
    },
};

export const AssetInputOnlyTitle: Story = {
    name: 'Input - Only Title',
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
            </AssetInput.Root>
        );
    },
};

export const AssetInputLongTitle: Story = {
    name: 'Input - Long Title',
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
                <AssetInput.Title>
                    A really long asset title that should overflow the available space and be truncated with an ellipsis
                </AssetInput.Title>
                <AssetInput.Metadata>
                    <AssetInput.MetadataItem>
                        <Flex align="center" gap={0.5}>
                            <IconArrowCircleUp size="16" />
                            Uploaded
                        </Flex>
                    </AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                </AssetInput.Metadata>
            </AssetInput.Root>
        );
    },
};

export const AssetInputSingleMetadataItem: Story = {
    name: 'Input - Single Metadata Item',
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
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                </AssetInput.Metadata>
            </AssetInput.Root>
        );
    },
};

export const AssetInputManyMetadataItems: Story = {
    name: 'Input - Many Metadata Items',
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
                    <AssetInput.MetadataItem>
                        <Flex align="center" gap={0.5}>
                            <IconArrowCircleUp size="16" />
                            Uploaded
                        </Flex>
                    </AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>1920x1080</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>RGB</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>72 DPI</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>Created now</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>Modified never</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>Marketing folder</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>Even</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>More</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>Metadata</AssetInput.MetadataItem>
                </AssetInput.Metadata>
            </AssetInput.Root>
        );
    },
};

export const AssetInputFullExample: Story = {
    name: 'Full Example - Placeholder to Input',
    parameters: {
        controls: { include: ['acceptFileType', 'orientation'] },
    },
    render: ({ acceptFileType, orientation }) => {
        const [asset, setAsset] = useState<{ name: string; src: string } | null>(null);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
            action('onFileChange')(event);
            const file = event.target.files?.[0];
            if (file) {
                setAsset({ name: file.name, src: URL.createObjectURL(file) });
            }
            event.target.value = '';
        };

        const handleBrowse = () => {
            action('browse')();
            setAsset({ name: 'browsed-asset.jpg', src: 'https://picsum.photos/100/150' });
            setIsDropdownOpen(false);
        };

        const handleUploadClick = () => {
            action('upload')();
            setIsDropdownOpen(false);
            fileInputRef.current?.click();
        };

        const handleRemove = () => {
            action('remove')();
            setAsset(null);
            setIsDropdownOpen(false);
        };

        if (!asset) {
            return (
                <AssetInput.Placeholder>
                    <AssetInput.UploadInput acceptFileType={acceptFileType} onSelect={handleSelectFile} />
                    <AssetInput.BrowseInput onBrowse={handleBrowse} />
                </AssetInput.Placeholder>
            );
        }

        return (
            <>
                <Dropdown.Root open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <Dropdown.Trigger asChild>
                        <AssetInput.Root orientation={orientation} isOpen={isDropdownOpen}>
                            <AssetInput.Preview>
                                <AssetInput.PreviewImage src={asset.src} />
                            </AssetInput.Preview>
                            <AssetInput.Title>{asset.name}</AssetInput.Title>
                            <AssetInput.Metadata>
                                <AssetInput.MetadataItem>
                                    <Flex align="center" gap={0.5}>
                                        <IconArrowCircleUp size="16" />
                                        Uploaded
                                    </Flex>
                                </AssetInput.MetadataItem>
                                <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                                <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                            </AssetInput.Metadata>
                        </AssetInput.Root>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="start">
                        <Dropdown.Group>
                            <Dropdown.Item onSelect={handleBrowse}>
                                <IconImageStack size={16} />
                                Replace with browse
                            </Dropdown.Item>
                            <Dropdown.Item onSelect={handleUploadClick}>
                                <IconArrowCircleUp size={16} />
                                Replace with upload
                            </Dropdown.Item>
                        </Dropdown.Group>
                        <Dropdown.Group>
                            <Dropdown.Item emphasis="danger" onSelect={handleRemove}>
                                <IconTrashBin size={16} />
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Group>
                    </Dropdown.Content>
                </Dropdown.Root>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptFileType}
                    style={{ display: 'none' }}
                    onChange={handleSelectFile}
                />
            </>
        );
    },
};
