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
    CardActions,
    CardActionsButton,
    CardBadges,
    CardBanner,
    type CardBannerFit,
    CardBannerIcon,
    CardBannerImage,
    CardBannerImages,
    type CardBannerSize,
    CardIcon,
    CardLogo,
    CardMeta,
    CardMetas,
    CardRoot,
    CardTitle,
} from './Card';

type PlaygroundArgs = {
    metas: string[];
    bannerSize: CardBannerSize;
    bannerFit: CardBannerFit;
};

type Story = StoryObj<PlaygroundArgs>;

const renderMetas = (metas: string[]) =>
    metas.length === 0 ? null : metas.length === 1 ? (
        <Card.Meta>{metas[0]}</Card.Meta>
    ) : (
        <Card.Metas>
            {metas.map((meta) => (
                <Card.Meta key={meta}>{meta}</Card.Meta>
            ))}
        </Card.Metas>
    );

const meta: Meta<PlaygroundArgs> = {
    title: 'Components/Card',
    component: CardRoot as ComponentType<PlaygroundArgs>,
    tags: ['autodocs'],
    subcomponents: {
        'Card.Banner': CardBanner,
        'Card.BannerImage': CardBannerImage,
        'Card.BannerImages': CardBannerImages,
        'Card.BannerIcon': CardBannerIcon,
        'Card.Badges': CardBadges,
        'Card.Logo': CardLogo,
        'Card.Icon': CardIcon,
        'Card.Title': CardTitle,
        'Card.Meta': CardMeta,
        'Card.Metas': CardMetas,
        'Card.Actions': CardActions,
        'Card.ActionsButton': CardActionsButton,
    },
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    argTypes: {
        metas: {
            control: { type: 'object' },
            description: 'List of meta text items. Add multiple to display them separated by a dot.',
        },
    },
    args: {
        metas: ['No status', '36 assets'],
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
    render: ({ metas = [], bannerSize, bannerFit, ...args }) => {
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

                <Card.Icon><IconFolder size={20} /></Card.Icon>

                <Card.Title>[Folder name that is long enough to be truncated]</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Card.ActionsButton aria-label="Settings"><IconCog size={20} /></Card.ActionsButton>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Delete</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Card.Actions>
            </Card.Root>
        );
    },
};

export const AssetCard: Story = {
    decorators: singleCardDecorators,
    render: ({ metas = [] }) => {
        const [selected, setSelected] = useState(true);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerImage
                        src="https://picsum.photos/seed/asset/300/300"
                        alt="Asset preview"
                        fit="contain"
                    />
                    <Card.Badges>
                        <Badge>Badge</Badge>
                    </Card.Badges>
                </Card.Banner>

                <Card.Title>[Asset name]</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Card.ActionsButton aria-label="Settings"><IconCog size={20} /></Card.ActionsButton>
                    <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                </Card.Actions>
            </Card.Root>
        );
    },
};

export const CollectionCard: Story = {
    decorators: singleCardDecorators,
    render: ({ metas = [] }) => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner size="small">
                    <Card.BannerImages>
                        <Card.BannerImage src="https://picsum.photos/seed/col1/300/200" alt="Image 1" />
                        <Card.BannerImage src="https://picsum.photos/seed/col2/300/200" alt="Image 2" />
                    </Card.BannerImages>
                </Card.Banner>

                <Card.Title>[Collection name]</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Card.ActionsButton aria-label="Settings"><IconCog size={20} /></Card.ActionsButton>
                    <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                </Card.Actions>
            </Card.Root>
        );
    },
};

export const EmptyCollectionCard: Story = {
    decorators: singleCardDecorators,
    render: ({ metas = [] }) => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner size="small">
                    <Card.BannerIcon><IconImageStack size={32} /></Card.BannerIcon>
                </Card.Banner>

                <Card.Title>[Collection name]</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Card.ActionsButton aria-label="Settings"><IconCog size={20} /></Card.ActionsButton>
                    <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                </Card.Actions>
            </Card.Root>
        );
    },
};

export const FolderCard: Story = {
    decorators: singleCardDecorators,
    render: ({ metas = [] }) => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerIcon><IconHome size={32} /></Card.BannerIcon>
                    <Card.Badges>
                        <Badge emphasis="strong">Installed</Badge>
                    </Card.Badges>
                </Card.Banner>

                <Card.Icon><IconFolder size={20} /></Card.Icon>

                <Card.Title>[Folder name]</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                </Card.Actions>
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

                <Card.Logo src="https://picsum.photos/seed/logo/80/80" alt="Company logo" />

                <Card.Title>Card with Logo</Card.Title>

                <Card.Actions>
                    <Card.ActionsButton aria-label="Favorite"><IconStar size={20} /></Card.ActionsButton>
                    <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                </Card.Actions>
            </Card.Root>
        );
    },
};

export const MultipleBannerImages: Story = {
    args: {
        metas: ['No status', 'JPG'],
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
    render: ({ metas = [], bannerSize }) => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner size={bannerSize}>
                    <Card.BannerImages>
                        <Card.BannerImage src="https://picsum.photos/seed/img1/200/200" alt="Image 1" />
                        <Card.BannerImage src="https://picsum.photos/seed/img2/200/200" alt="Image 2" />
                        <Card.BannerImage src="https://picsum.photos/seed/img3/200/200" alt="Image 3" />
                    </Card.BannerImages>
                </Card.Banner>

                <Card.Title>Three Images</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Card.ActionsButton aria-label="Favorite"><IconStar size={20} /></Card.ActionsButton>
                    <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                </Card.Actions>
            </Card.Root>
        );
    },
};

export const WithoutBanner: Story = {
    args: {
        metas: ['No status'],
    },

    decorators: singleCardDecorators,

    render: ({ metas = [] }) => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Icon><IconLightning size={20} /></Card.Icon>

                <Card.Title>[App name]</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Badge emphasis="strong" variant="highlight">
                        Badge
                    </Badge>
                    <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                </Card.Actions>
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

const ResponsiveGridExample = ({ metas = [] }: { metas: string[] }) => {
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
                                <Card.BannerIcon><IconIcon size={32} /></Card.BannerIcon>
                            )}
                        </Card.Banner>

                        <Card.Logo src={card.logo} alt={card.name} />

                        <Card.Title>{card.name}</Card.Title>
                        {renderMetas(metas)}

                        <Card.Actions>
                            <Card.ActionsButton aria-label="Favorite"><IconStar size={20} /></Card.ActionsButton>
                            <Card.ActionsButton aria-label="Settings"><IconCog size={20} /></Card.ActionsButton>
                            <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                        </Card.Actions>
                    </Card.Root>
                );
            })}
        </div>
    );
};

export const ResponsiveGrid: Story = {
    render: ({ metas = [] }) => <ResponsiveGridExample metas={metas} />,
};

export const NonInteractive: Story = {
    decorators: singleCardDecorators,
    render: ({ metas = [] }) => {
        return (
            <Card.Root>
                <Card.Banner>
                    <Card.BannerImage src="https://picsum.photos/seed/static/400/200" alt="Static card" />
                </Card.Banner>

                <Card.Icon><IconFolder size={20} /></Card.Icon>

                <Card.Title>[Display-only card]</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
                </Card.Actions>
            </Card.Root>
        );
    },
};

export const FullExample: Story = {
    decorators: singleCardDecorators,
    render: ({ metas = [] }) => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerImage src="https://picsum.photos/seed/full/400/300" alt="Full example" />
                    <Card.Badges>
                        <Badge>New</Badge>
                    </Card.Badges>
                </Card.Banner>

                <Card.Logo src="https://picsum.photos/seed/fulllogo/80/80" alt="Logo" />

                <Card.Title>Complete Card Example</Card.Title>
                {renderMetas(metas)}

                <Card.Actions>
                    <Card.ActionsButton aria-label="Settings"><IconCog size={20} /></Card.ActionsButton>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Card.ActionsButton aria-label="More actions"><IconDotsVertical size={20} /></Card.ActionsButton>
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
                </Card.Actions>
            </Card.Root>
        );
    },
};
