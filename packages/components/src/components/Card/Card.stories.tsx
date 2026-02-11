/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCog, IconDotsVertical, IconFolder, IconIcon, IconLightning, IconStar } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Badge, Dropdown, Flex } from '#/index';

import {
    Card,
    CardActions,
    CardActionsButton,
    CardBadges,
    CardBanner,
    CardBannerIcon,
    CardBannerImage,
    CardBannerImages,
    CardIcon,
    CardLogo,
    CardMeta,
    CardMetas,
    CardRoot,
    CardTitle,
} from './Card';

type Story = StoryObj<typeof CardRoot>;
const meta: Meta<typeof CardRoot> = {
    title: 'Components/Card',
    component: CardRoot,
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
    args: {
        selected: false,
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

const DefaultExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerImage src="https://picsum.photos/seed/card1/400/200" alt="Sample image" />
            </Card.Banner>

            <Card.Icon icon={<IconFolder size={20} />} />

            <Card.Title>[Folder name that is long enough to be truncated]</Card.Title>
            <Card.Meta>No status · 36 assets</Card.Meta>

            <Card.Actions>
                <Card.ActionsButton icon={<IconCog size={20} />} aria-label="Settings" />
                <Dropdown.Root>
                    <Dropdown.Trigger>
                        <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Delete</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </Card.Actions>
        </Card.Root>
    );
};

export const Default: Story = {
    decorators: singleCardDecorators,
    render: () => <DefaultExample />,
};

const WithSmallBannerExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner size="small">
                <Card.BannerImage src="https://picsum.photos/seed/card3/400/300" alt="Small banner" />
                <Card.Badges>
                    <Badge>Featured</Badge>
                    <Badge emphasis="strong" variant="highlight">
                        Popular
                    </Badge>
                </Card.Badges>
            </Card.Banner>

            <Card.Icon icon={<IconFolder size={20} />} />

            <Card.Title>Small Banner Card</Card.Title>
            <Card.Meta>With multiple badges</Card.Meta>
        </Card.Root>
    );
};

export const WithSmallBanner: Story = {
    decorators: singleCardDecorators,
    render: () => <WithSmallBannerExample />,
};

const WithBannerIconExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerIcon icon={<IconIcon size={32} />} />
            </Card.Banner>

            <Card.Icon icon={<IconFolder size={20} />} />

            <Card.Title>Icon Banner</Card.Title>
            <Card.Meta>Uses an icon instead of images</Card.Meta>
        </Card.Root>
    );
};

export const WithBannerIcon: Story = {
    decorators: singleCardDecorators,
    render: () => <WithBannerIconExample />,
};

const WithLogoExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerImage src="https://picsum.photos/seed/card4/400/200" alt="Banner" />
            </Card.Banner>

            <Card.Logo src="https://picsum.photos/seed/logo/80/80" alt="Company logo" />

            <Card.Title>Card with Logo</Card.Title>
            <Card.Meta>Displays a logo below the banner</Card.Meta>
        </Card.Root>
    );
};

export const WithLogo: Story = {
    decorators: singleCardDecorators,
    render: () => <WithLogoExample />,
};

const WithMultipleMetasExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerImage src="https://picsum.photos/seed/card6/400/200" alt="Banner" />
            </Card.Banner>

            <Card.Icon icon={<IconFolder size={20} />} />

            <Card.Title>Multiple Metas</Card.Title>
            <Card.Metas>
                <Card.Meta>No status</Card.Meta>
                <Card.Meta>36 assets</Card.Meta>
            </Card.Metas>
        </Card.Root>
    );
};

export const WithMultipleMetas: Story = {
    decorators: singleCardDecorators,
    render: () => <WithMultipleMetasExample />,
};

const FourStatesExample = () => {
    const [selectedId, setSelectedId] = useState<string | null>('card-3');

    const cards = [
        { id: 'card-1', label: 'Idle' },
        { id: 'card-2', label: 'Hover (hover me)' },
        { id: 'card-3', label: 'Selected' },
        { id: 'card-4', label: 'Hover + Selected (hover me)' },
    ];

    return (
        <Flex gap="1rem">
            {cards.map((card) => (
                <div key={card.id} style={{ flex: 1, minWidth: 0 }}>
                    <Card.Root
                        selected={selectedId === card.id || card.id === 'card-3' || card.id === 'card-4'}
                        onClick={() => setSelectedId(card.id)}
                    >
                        <Card.Banner>
                            <Card.BannerImage src="https://picsum.photos/seed/card1/400/200" alt="Sample" />
                        </Card.Banner>

                        <Card.Icon icon={<IconFolder size={20} />} />

                        <Card.Title>[Folder name]</Card.Title>
                        <Card.Meta>No status · 36 assets</Card.Meta>

                        <Card.Actions>
                            <Card.ActionsButton icon={<IconCog size={20} />} aria-label="Settings" />
                            <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
                        </Card.Actions>
                    </Card.Root>
                    <p style={{ textAlign: 'center', fontSize: 12, marginTop: 8, color: '#666' }}>{card.label}</p>
                </div>
            ))}
        </Flex>
    );
};

export const FourStates: Story = {
    render: () => <FourStatesExample />,
};

const AssetCardExample = () => {
    const [selected, setSelected] = useState(true);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerImage src="https://picsum.photos/seed/asset/300/300" alt="Asset preview" fit="contain" />
                <Card.Badges>
                    <Badge>Badge</Badge>
                </Card.Badges>
            </Card.Banner>

            <Card.Title>[Asset name]</Card.Title>
            <Card.Meta>No status · JPEG</Card.Meta>

            <Card.Actions>
                <Card.ActionsButton icon={<IconCog size={20} />} aria-label="Settings" />
                <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
            </Card.Actions>
        </Card.Root>
    );
};

export const AssetCard: Story = {
    decorators: singleCardDecorators,
    render: () => <AssetCardExample />,
};

const CollectionCardExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerImages>
                    <Card.BannerImage src="https://picsum.photos/seed/col1/300/200" alt="Image 1" />
                    <Card.BannerImage src="https://picsum.photos/seed/col2/300/200" alt="Image 2" />
                </Card.BannerImages>
            </Card.Banner>

            <Card.Logo src="https://picsum.photos/seed/avatar/100/100" alt="User avatar" overlap />

            <Card.Title>[Collection name]</Card.Title>
            <Card.Meta>36 assets</Card.Meta>

            <Card.Actions>
                <Card.ActionsButton icon={<IconCog size={20} />} aria-label="Settings" />
                <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
            </Card.Actions>
        </Card.Root>
    );
};

export const CollectionCard: Story = {
    decorators: singleCardDecorators,
    render: () => <CollectionCardExample />,
};

const MultipleBannerImagesExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerImages>
                    <Card.BannerImage src="https://picsum.photos/seed/img1/200/200" alt="Image 1" />
                    <Card.BannerImage src="https://picsum.photos/seed/img2/200/200" alt="Image 2" />
                    <Card.BannerImage src="https://picsum.photos/seed/img3/200/200" alt="Image 3" />
                </Card.BannerImages>
            </Card.Banner>

            <Card.Icon icon={<IconFolder size={20} />} />

            <Card.Title>Three Images</Card.Title>
            <Card.Meta>Multiple banner images</Card.Meta>
        </Card.Root>
    );
};

export const MultipleBannerImages: Story = {
    decorators: singleCardDecorators,
    render: () => <MultipleBannerImagesExample />,
};

const AppCardExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerIcon icon={<IconIcon size={32} />} />
                <Card.Badges>
                    <Badge emphasis="strong">Installed</Badge>
                </Card.Badges>
            </Card.Banner>

            <Card.Logo src="https://picsum.photos/seed/avatar/100/100" alt="App logo" overlap />

            <Card.Icon icon={<IconLightning size={20} />} />

            <Card.Title>[App name]</Card.Title>
            <Card.Meta>[Secondary text]</Card.Meta>

            <Card.Actions>
                <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
            </Card.Actions>
        </Card.Root>
    );
};

export const AppCard: Story = {
    decorators: singleCardDecorators,
    render: () => <AppCardExample />,
};

const WithoutBannerExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root selected={selected} onClick={() => setSelected((s) => !s)}>
            <Card.Icon icon={<IconLightning size={20} />} />

            <Card.Title>[App name]</Card.Title>
            <Card.Meta>[Secondary text]</Card.Meta>

            <Card.Actions>
                <Badge emphasis="strong" variant="highlight">
                    Badge
                </Badge>
                <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
            </Card.Actions>
        </Card.Root>
    );
};

export const WithoutBanner: Story = {
    decorators: singleCardDecorators,
    render: () => <WithoutBannerExample />,
};

const AppCardFourStatesExample = () => {
    const cards = [
        { id: 'app-1', label: 'Idle', selected: false },
        { id: 'app-2', label: 'Hover (hover me)', selected: false },
        { id: 'app-3', label: 'Selected', selected: true },
        { id: 'app-4', label: 'Hover + Selected (hover me)', selected: true },
    ];

    return (
        <Flex gap="1rem">
            {cards.map((card) => (
                <div key={card.id} style={{ flex: 1, minWidth: 0 }}>
                    <Card.Root selected={card.selected} onClick={() => {}}>
                        <Card.Banner>
                            <Card.BannerIcon icon={<IconIcon size={32} />} />
                            <Card.Badges>
                                <Badge emphasis="strong">Installed</Badge>
                            </Card.Badges>
                        </Card.Banner>

                        <Card.Logo src="https://picsum.photos/seed/avatar/100/100" alt="App logo" overlap />

                        <Card.Icon icon={<IconLightning size={20} />} />

                        <Card.Title>[App name]</Card.Title>
                        <Card.Meta>by Frontify</Card.Meta>

                        <Card.Actions>
                            <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
                        </Card.Actions>
                    </Card.Root>
                    <p style={{ textAlign: 'center', fontSize: 12, marginTop: 8, color: '#666' }}>{card.label}</p>
                </div>
            ))}
        </Flex>
    );
};

export const AppCardFourStates: Story = {
    render: () => <AppCardFourStatesExample />,
};

const WithoutBannerFourStatesExample = () => {
    const cards = [
        { id: 'no-banner-1', label: 'Idle', selected: false },
        { id: 'no-banner-2', label: 'Hover (hover me)', selected: false },
        { id: 'no-banner-3', label: 'Selected', selected: true },
        { id: 'no-banner-4', label: 'Hover + Selected (hover me)', selected: true },
    ];

    return (
        <Flex gap="1rem">
            {cards.map((card) => (
                <div key={card.id} style={{ flex: 1, minWidth: 0 }}>
                    <Card.Root selected={card.selected} onClick={() => {}}>
                        <Card.Icon icon={<IconLightning size={20} />} />

                        <Card.Title>[App name]</Card.Title>
                        <Card.Meta>by Frontify</Card.Meta>

                        <Card.Actions>
                            <Badge emphasis="strong" variant="highlight">
                                Badge
                            </Badge>
                            <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
                        </Card.Actions>
                    </Card.Root>
                    <p style={{ textAlign: 'center', fontSize: 12, marginTop: 8, color: '#666' }}>{card.label}</p>
                </div>
            ))}
        </Flex>
    );
};

export const WithoutBannerFourStates: Story = {
    render: () => <WithoutBannerFourStatesExample />,
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
                                <Card.BannerIcon icon={<IconIcon size={32} />} />
                            )}
                        </Card.Banner>

                        <Card.Logo src={card.logo} alt={card.name} />

                        <Card.Title>{card.name}</Card.Title>
                        <Card.Meta>Brand guideline</Card.Meta>

                        <Card.Actions>
                            <Card.ActionsButton icon={<IconStar size={20} />} aria-label="Favorite" />
                            <Card.ActionsButton icon={<IconCog size={20} />} aria-label="Settings" />
                            <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
                        </Card.Actions>
                    </Card.Root>
                );
            })}
        </div>
    );
};

export const ResponsiveGrid: Story = {
    render: () => <ResponsiveGridExample />,
};

const WithHrefExample = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const cards = [
        { id: 'hw', name: 'Healthway Labs', href: '#/brand/healthway' },
        { id: 'strive', name: 'Strive', href: '#/brand/strive' },
        { id: 'pizza', name: 'Pizza Pie', href: '#/brand/pizza' },
    ];

    return (
        <Flex gap="1rem">
            {cards.map((card) => (
                <div key={card.id} style={{ width: 260 }}>
                    <Card.Root
                        href={card.href}
                        selected={selectedId === card.id}
                        aria-label={card.name}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedId(selectedId === card.id ? null : card.id);
                        }}
                        onDoubleClick={() => {
                            window.location.hash = card.href.replace('#', '');
                        }}
                    >
                        <Card.Banner>
                            <Card.BannerImage
                                src={`https://picsum.photos/seed/${card.id}-bg/400/200`}
                                alt={card.name}
                            />
                        </Card.Banner>

                        <Card.Icon icon={<IconFolder size={20} />} />

                        <Card.Title>{card.name}</Card.Title>
                        <Card.Meta>Click to select, double-click to navigate</Card.Meta>

                        <Card.Actions>
                            <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
                        </Card.Actions>
                    </Card.Root>
                </div>
            ))}
        </Flex>
    );
};

export const WithHref: Story = {
    render: () => <WithHrefExample />,
};

const FullExampleComponent = () => {
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
            <Card.Metas>
                <Card.Meta>Primary detail</Card.Meta>
                <Card.Meta>Secondary detail</Card.Meta>
            </Card.Metas>

            <Card.Actions>
                <Card.ActionsButton icon={<IconCog size={20} />} aria-label="Settings" />
                <Dropdown.Root>
                    <Dropdown.Trigger>
                        <Card.ActionsButton icon={<IconDotsVertical size={20} />} aria-label="More actions" />
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
};

export const FullExample: Story = {
    decorators: singleCardDecorators,
    render: () => <FullExampleComponent />,
};
