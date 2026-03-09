/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconCog,
    IconDotsVertical,
    IconFolder,
    IconHome,
    IconIcon,
    IconImageStack,
    IconLightning,
    IconStar,
} from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ComponentType, useState } from 'react';

import { Badge, Dropdown } from '#/index';

import {
    Card,
    CardAction,
    CardActionsButton,
    CardBadges,
    CardBanner,
    type CardBannerFit,
    CardBannerIcon,
    CardBannerImage,
    type CardBannerSize,
    CardDescription,
    CardThumbnailIcon,
    CardThumbnailImage,
    CardRoot,
    CardTitle,
} from './Card';

type PlaygroundArgs = {
    bannerSize: CardBannerSize;
    bannerFit: CardBannerFit;
};

type Story = StoryObj<PlaygroundArgs>;

const meta: Meta<PlaygroundArgs> = {
    title: 'Components/Card',
    component: CardRoot as ComponentType<PlaygroundArgs>,
    tags: ['autodocs'],
    subcomponents: {
        'Card.Banner': CardBanner,
        'Card.BannerImage': CardBannerImage,
        'Card.BannerIcon': CardBannerIcon,
        'Card.Badges': CardBadges,
        'Card.ThumbnailImage': CardThumbnailImage,
        'Card.ThumbnailIcon': CardThumbnailIcon,
        'Card.Title': CardTitle,
        'Card.Description': CardDescription,
        'Card.Action': CardAction,
        'Card.ActionsButton': CardActionsButton,
    },
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
};
export default meta;

const singleCardDecorators: Story['decorators'] = [
    (Story) => (
        <div style={{ width: 280 }}>
            <Story />
        </div>
    ),
];

export const Default: Story = {
    decorators: singleCardDecorators,
    argTypes: {
        bannerSize: {
            control: { type: 'inline-radio' },
            options: ['small', 'large'],
            description: 'Height variant of the banner.',
        },
        bannerFit: {
            control: { type: 'inline-radio' },
            options: ['cover', 'contain'],
            description: 'How the banner image fits within its container.',
        },
    },
    args: {
        bannerSize: 'large',
        bannerFit: 'cover',
    },
    render: ({ bannerSize, bannerFit, ...args }) => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root {...args} selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner size={bannerSize}>
                    <Card.BannerImage
                        src="https://picsum.photos/seed/card1/400/200"
                        alt="Sample image"
                        fit={bannerFit}
                    />
                </Card.Banner>

                <Card.ThumbnailIcon>
                    <IconFolder size={20} />
                </Card.ThumbnailIcon>

                <Card.Title>[Folder name that is long enough to be truncated]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionsButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionsButton>
                </Card.Action>
                <Card.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Card.ActionsButton aria-label="More actions">
                                <IconDotsVertical size={20} />
                            </Card.ActionsButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Delete</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const AssetCard: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(true);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerImage
                        src="https://picsum.photos/seed/asset/300/300"
                        alt="Asset preview"
                        fit="contain"
                    />
                </Card.Banner>

                <Card.Title>[Asset name]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>
                <Card.Badges>
                    <Badge>Badge</Badge>
                    <Badge>Badge</Badge>
                </Card.Badges>

                <Card.Action>
                    <Card.ActionsButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionsButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionsButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionsButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const CollectionCard: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner size="small">
                    <Card.BannerImage src="https://picsum.photos/seed/col1/300/200" alt="Image 1" />
                    <Card.BannerImage src="https://picsum.photos/seed/col2/300/200" alt="Image 2" />
                </Card.Banner>

                <Card.Title>[Collection name]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionsButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionsButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionsButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionsButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const EmptyCollectionCard: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner size="small">
                    <Card.BannerIcon>
                        <IconImageStack size={32} />
                    </Card.BannerIcon>
                </Card.Banner>

                <Card.Title>[Collection name]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionsButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionsButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionsButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionsButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const FolderCard: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerIcon>
                        <IconHome size={32} />
                    </Card.BannerIcon>
                </Card.Banner>
                <Card.Badges>
                    <Badge emphasis="strong">Installed</Badge>
                </Card.Badges>

                <Card.ThumbnailIcon>
                    <IconFolder size={20} />
                </Card.ThumbnailIcon>

                <Card.Title>[Folder name]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionsButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionsButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const BrandCard: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerImage src="https://picsum.photos/seed/card4/400/200" alt="Banner" />
                </Card.Banner>

                <Card.ThumbnailImage src="https://picsum.photos/seed/logo/80/80" alt="Company logo" />

                <Card.Title>Card with Logo</Card.Title>

                <Card.Action>
                    <Card.ActionsButton aria-label="Favorite">
                        <IconStar size={20} />
                    </Card.ActionsButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionsButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionsButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const MultipleBannerImages: Story = {
    args: {
        bannerSize: 'large',
    },
    argTypes: {
        bannerSize: {
            control: { type: 'inline-radio' },
            options: ['small', 'large'],
            description: 'Height variant of the banner.',
        },
    },
    decorators: singleCardDecorators,
    render: ({ bannerSize }) => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner size={bannerSize}>
                    <Card.BannerImage src="https://picsum.photos/seed/img1/200/200" alt="Image 1" />
                    <Card.BannerImage src="https://picsum.photos/seed/img2/200/200" alt="Image 2" />
                    <Card.BannerImage src="https://picsum.photos/seed/img3/200/200" alt="Image 3" />
                </Card.Banner>

                <Card.Title>Three Images</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionsButton aria-label="Favorite">
                        <IconStar size={20} />
                    </Card.ActionsButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionsButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionsButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const WithoutBanner: Story = {
    decorators: singleCardDecorators,

    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.ThumbnailIcon>
                    <IconLightning size={20} />
                </Card.ThumbnailIcon>
                <Card.Badges>
                    <Badge emphasis="strong">Installed</Badge>
                </Card.Badges>

                <Card.Title>[App name]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionsButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionsButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

const gridCards = [
    {
        name: 'Healthway Labs',
        logo: 'https://picsum.photos/seed/hw/80/80',
        banner: 'https://picsum.photos/seed/hw-bg/400/200',
    },
    {
        name: 'Strive',
        logo: 'https://picsum.photos/seed/strive/80/80',
        banner: 'https://picsum.photos/seed/strive-bg/400/200',
    },
    {
        name: 'Pizza Pie',
        logo: 'https://picsum.photos/seed/pizza/80/80',
        banner: 'https://picsum.photos/seed/pizza-bg/400/200',
    },
    { name: 'Ventura: Corporate', logo: 'https://picsum.photos/seed/vent1/80/80' },
    { name: 'Ventura: Corporate', logo: 'https://picsum.photos/seed/vent2/80/80' },
    { name: 'Ventura: Corporate', logo: 'https://picsum.photos/seed/vent3/80/80' },
    { name: 'Micro: Commercial (al...', logo: 'https://picsum.photos/seed/micro/80/80' },
    {
        name: 'Nobrand: Neutral',
        logo: 'https://picsum.photos/seed/nobrand1/80/80',
        banner: 'https://picsum.photos/seed/nobrand1-bg/400/200',
    },
    {
        name: 'Nobrand: Neutral',
        logo: 'https://picsum.photos/seed/nobrand2/80/80',
        banner: 'https://picsum.photos/seed/nobrand2-bg/400/200',
    },
    { name: 'Ventura: Corporate', logo: 'https://picsum.photos/seed/vent4/80/80' },
];

const ResponsiveGridExample = () => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1rem',
            }}
        >
            {gridCards.map((card) => {
                const key = card.name + card.logo;
                return (
                    <Card.Root
                        key={key}
                        selected={selectedKey === key}
                        onClick={() => setSelectedKey(selectedKey === key ? null : key)}
                    >
                        <Card.Banner>
                            {card.banner ? (
                                <Card.BannerImage src={card.banner} alt={card.name} />
                            ) : (
                                <Card.BannerIcon>
                                    <IconIcon size={32} />
                                </Card.BannerIcon>
                            )}
                        </Card.Banner>

                        <Card.ThumbnailImage src={card.logo} alt={card.name} />

                        <Card.Title>{card.name}</Card.Title>
                        <Card.Description>No status · 36 assets</Card.Description>

                        <Card.Action>
                            <Card.ActionsButton aria-label="Favorite">
                                <IconStar size={20} />
                            </Card.ActionsButton>
                        </Card.Action>
                        <Card.Action>
                            <Card.ActionsButton aria-label="Settings">
                                <IconCog size={20} />
                            </Card.ActionsButton>
                        </Card.Action>
                        <Card.Action>
                            <Card.ActionsButton aria-label="More actions">
                                <IconDotsVertical size={20} />
                            </Card.ActionsButton>
                        </Card.Action>
                    </Card.Root>
                );
            })}
        </div>
    );
};

export const ResponsiveGrid: Story = {
    render: () => <ResponsiveGridExample />,
};

export const NonInteractive: Story = {
    decorators: singleCardDecorators,
    render: () => {
        return (
            <Card.Root>
                <Card.Banner>
                    <Card.BannerImage src="https://picsum.photos/seed/static/400/200" alt="Static card" />
                </Card.Banner>

                <Card.ThumbnailIcon>
                    <IconFolder size={20} />
                </Card.ThumbnailIcon>

                <Card.Title>[Display-only card]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionsButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionsButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const FullExample: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerImage src="https://picsum.photos/seed/full/400/300" alt="Full example" />
                </Card.Banner>
                <Card.Badges>
                    <Badge>New</Badge>
                </Card.Badges>

                <Card.ThumbnailImage src="https://picsum.photos/seed/fulllogo/80/80" alt="Logo" />

                <Card.Title>Complete Card Example</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionsButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionsButton>
                </Card.Action>
                <Card.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Card.ActionsButton aria-label="More actions">
                                <IconDotsVertical size={20} />
                            </Card.ActionsButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Duplicate</Dropdown.Item>
                            <hr />
                            <Dropdown.Item onSelect={() => {}}>
                                <span className="tw-text-negative-default">Delete</span>
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Card.Action>
            </Card.Root>
        );
    },
};
