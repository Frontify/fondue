/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconArrowAlignDown,
    IconCog,
    IconDotsVertical,
    IconExclamationMarkTriangle,
    IconFolder,
    IconHome,
    IconIcon,
    IconImageStack,
    IconLightning,
    IconSpeechBubbleEmpty,
    IconStar,
    IconTarget,
} from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Badge, Dropdown, Tooltip } from '#/index';

import { RouterProvider } from '../RouterProvider/RouterProvider';

import {
    Card,
    CardAction,
    CardActionButton,
    CardBadges,
    CardBanner,
    CardBannerIcon,
    CardBannerImage,
    CardDescription,
    CardRoot,
    CardThumbnailIcon,
    CardThumbnailImage,
    CardTitle,
    type CardBannerFit,
    type CardBannerImagePadding,
} from './Card';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Card',
    component: CardRoot,
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
        'Card.ActionButton': CardActionButton,
    },
    parameters: {
        status: {
            type: 'released',
        },
    },
    decorators: [
        (Story) => (
            <RouterProvider
                navigate={(path: string) => alert(`Navigate to: ${path}`)}
                useHref={(path: string) => `/resolved${path}`}
            >
                <Story />
            </RouterProvider>
        ),
    ],
} satisfies Meta;
export default meta;

const singleCardDecorators: Story['decorators'] = [
    (Story) => (
        <div style={{ width: 280 }}>
            <Story />
        </div>
    ),
];

// Inline SVG logo used as the padded image source, so the story has no network dependency.
const LOGO_ICON_DATA_URI = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4c43d6"><path d="M12 2 3 7v10l9 5 9-5V7zm0 2.31L18.18 8 12 11.69 5.82 8zM5 9.7l6 3.58v6.32l-6-3.33zm14 0v6.57l-6 3.33v-6.32z"/></svg>',
)}`;

type BannerImagePaddingControls = { padding: CardBannerImagePadding; fit: CardBannerFit };

// Story bodies are extracted into named components so `useState` runs inside a React component.
const BannerImagePaddingDemo = ({ padding, fit }: BannerImagePaddingControls) => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
            <Card.Banner>
                <Card.BannerImage src={LOGO_ICON_DATA_URI} alt="Logo preview" fit={fit} padding={padding} />
            </Card.Banner>

            <Card.Title>[Logo asset]</Card.Title>
            <Card.Description>{`padding="${padding}" · fit="${fit}"`}</Card.Description>

            <Card.Action>
                <Card.ActionButton aria-label="More actions">
                    <IconDotsVertical size={20} />
                </Card.ActionButton>
            </Card.Action>
        </Card.Root>
    );
};

const BannerToneInvertedDemo = () => {
    const [selected, setSelected] = useState(false);

    return (
        <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
            <Card.Banner tone="inverted">
                <Card.BannerIcon>
                    <IconArrowAlignDown size={32} />
                </Card.BannerIcon>
            </Card.Banner>

            <Card.Title>[Drop files here]</Card.Title>
            <Card.Description>Release to move into folder</Card.Description>

            <Card.Action>
                <Card.ActionButton aria-label="More actions">
                    <IconDotsVertical size={20} />
                </Card.ActionButton>
            </Card.Action>
        </Card.Root>
    );
};

const BannerToneDimComparison = () => {
    const [selectedDefault, setSelectedDefault] = useState(false);
    const [selectedDim, setSelectedDim] = useState(false);

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ width: 280 }}>
                <Card.Root href="#" selected={selectedDefault} onSelect={() => setSelectedDefault((s) => !s)}>
                    <Card.Banner>
                        <Card.BannerIcon>
                            <IconImageStack size={32} />
                        </Card.BannerIcon>
                    </Card.Banner>

                    <Card.Title>Default (no tone)</Card.Title>
                    <Card.Description>Hover → banner brightens</Card.Description>

                    <Card.Action>
                        <Card.ActionButton aria-label="More actions">
                            <IconDotsVertical size={20} />
                        </Card.ActionButton>
                    </Card.Action>
                </Card.Root>
            </div>

            <div style={{ width: 280 }}>
                <Card.Root href="#" selected={selectedDim} onSelect={() => setSelectedDim((s) => !s)}>
                    <Card.Banner tone="dim">
                        <Card.BannerIcon>
                            <IconImageStack size={32} />
                        </Card.BannerIcon>
                    </Card.Banner>

                    <Card.Title>tone=&quot;dim&quot;</Card.Title>
                    <Card.Description>Hover → banner stays dim</Card.Description>

                    <Card.Action>
                        <Card.ActionButton aria-label="More actions">
                            <IconDotsVertical size={20} />
                        </Card.ActionButton>
                    </Card.Action>
                </Card.Root>
            </div>
        </div>
    );
};

export const Default: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
                <Card.Banner size="large">
                    <Card.BannerImage src="https://picsum.photos/seed/card1/400/200" alt="Sample image" fit="cover" />
                </Card.Banner>

                <Card.ThumbnailIcon>
                    <IconFolder size={20} />
                </Card.ThumbnailIcon>

                <Card.Title>[Folder name that is long enough to be truncated]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Card.ActionButton aria-label="More actions">
                                <IconDotsVertical size={20} />
                            </Card.ActionButton>
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

export const WithBadges: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerImage
                        src="https://picsum.photos/seed/asset/300/300"
                        alt="Asset preview"
                        fit="contain"
                    />
                </Card.Banner>

                <Card.Title>Single Banner Image</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>
                <Card.Badges>
                    <Badge variant="highlight" emphasis="weak">
                        <IconSpeechBubbleEmpty size={20} /> 4
                    </Badge>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Badge emphasis="weak">
                                <IconTarget size={20} />
                            </Badge>
                        </Tooltip.Trigger>
                        <Tooltip.Content side="top">Target</Tooltip.Content>
                    </Tooltip.Root>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Badge variant="warning" emphasis="weak">
                                <IconExclamationMarkTriangle size={20} />
                            </Badge>
                        </Tooltip.Trigger>
                        <Tooltip.Content side="top">Warning</Tooltip.Content>
                    </Tooltip.Root>
                    <Badge variant="highlight">New</Badge>
                </Card.Badges>

                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const BannerImageWithPadding: StoryObj<BannerImagePaddingControls> = {
    decorators: [
        (Story) => (
            <div style={{ width: 280 }}>
                <Story />
            </div>
        ),
    ],
    args: {
        padding: 'medium',
        fit: 'contain',
    },
    argTypes: {
        padding: {
            control: 'select',
            options: ['none', 'small', 'medium', 'large'],
            description: 'Inner padding between the image and the banner edges (small 12px, medium 24px, large 32px).',
        },
        fit: {
            control: 'inline-radio',
            options: ['cover', 'contain'],
            description: 'How the image fits the banner. Padding pairs best with `contain`.',
        },
    },
    render: (args) => <BannerImagePaddingDemo {...args} />,
};

export const SmallBannerWithImages: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
                <Card.Banner size="small">
                    <Card.BannerImage src="https://picsum.photos/seed/col1/300/200" alt="Image 1" />
                    <Card.BannerImage src="https://picsum.photos/seed/col2/300/200" alt="Image 2" />
                    <Card.BannerImage src="https://picsum.photos/seed/col3/300/200" alt="Image 3" />
                </Card.Banner>

                <Card.Title>[Collection name]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const SmallBannerWithIcon: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
                <Card.Banner size="small">
                    <Card.BannerIcon>
                        <IconImageStack size={32} />
                    </Card.BannerIcon>
                </Card.Banner>

                <Card.Title>[Collection name]</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const BannerToneInverted: Story = {
    decorators: singleCardDecorators,
    render: () => <BannerToneInvertedDemo />,
};

export const BannerToneDim: Story = {
    name: 'BannerTone dim (hover to compare)',
    parameters: {
        docs: {
            description: {
                story:
                    'The effect of `tone="dim"` only shows on hover. A tone-less banner that contains a ' +
                    '`Card.BannerIcon` brightens to `surface-hover` when the interactive card is hovered; ' +
                    '`tone="dim"` pins `surface-dim` and opts out of that shift. Hover each card to compare.',
            },
        },
    },
    render: () => <BannerToneDimComparison />,
};

export const BannerIconWithThumbnail: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
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
                    <Card.ActionButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const WithThumbnailImage: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
                <Card.Banner>
                    <Card.BannerImage src="https://picsum.photos/seed/card4/400/200" alt="Banner" />
                </Card.Banner>

                <Card.ThumbnailImage src="https://picsum.photos/seed/logo/80/80" alt="Company logo" />

                <Card.Title>Card with Logo</Card.Title>

                <Card.Action>
                    <Card.ActionButton aria-label="Favorite">
                        <IconStar size={20} />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const MultipleBannerImages: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
                <Card.Banner size="large">
                    <Card.BannerImage src="https://picsum.photos/seed/img1/200/200" alt="Image 1" />
                    <Card.BannerImage src="https://picsum.photos/seed/img2/200/200" alt="Image 2" />
                    <Card.BannerImage src="https://picsum.photos/seed/img3/200/200" alt="Image 3" />
                </Card.Banner>

                <Card.Title>Three Images</Card.Title>
                <Card.Description>No status · 36 assets</Card.Description>

                <Card.Action>
                    <Card.ActionButton aria-label="Favorite">
                        <IconStar size={20} />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionButton aria-label="More actions">
                        <IconDotsVertical size={20} />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>
        );
    },
};

export const WithoutBanner: Story = {
    decorators: singleCardDecorators,
    render: () => (
        <Card.Root href="#">
            <Card.ThumbnailIcon>
                <IconLightning size={20} />
            </Card.ThumbnailIcon>
            <Card.Badges>
                <Badge emphasis="strong">Installed</Badge>
            </Card.Badges>

            <Card.Title>[App name]</Card.Title>
            <Card.Description>No status · 36 assets</Card.Description>

            <Card.Action>
                <Card.ActionButton aria-label="More actions">
                    <IconDotsVertical size={20} />
                </Card.ActionButton>
            </Card.Action>
        </Card.Root>
    ),
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

export const ResponsiveGrid: Story = {
    render: () => {
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
                            href="#"
                            selected={selectedKey === key}
                            onSelect={() => setSelectedKey(selectedKey === key ? null : key)}
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
                                <Card.ActionButton aria-label="Favorite">
                                    <IconStar size={20} />
                                </Card.ActionButton>
                            </Card.Action>
                            <Card.Action>
                                <Card.ActionButton aria-label="Settings">
                                    <IconCog size={20} />
                                </Card.ActionButton>
                            </Card.Action>
                            <Card.Action>
                                <Card.ActionButton aria-label="More actions">
                                    <IconDotsVertical size={20} />
                                </Card.ActionButton>
                            </Card.Action>
                        </Card.Root>
                    );
                })}
            </div>
        );
    },
};

export const LinkOnly: Story = {
    decorators: singleCardDecorators,
    render: () => (
        <Card.Root href="https://example.com" aria-label="Navigate to project">
            <Card.Banner>
                <Card.BannerImage src="https://picsum.photos/seed/link/400/200" alt="Link card" />
            </Card.Banner>

            <Card.ThumbnailIcon>
                <IconFolder size={20} />
            </Card.ThumbnailIcon>

            <Card.Title>[Project name]</Card.Title>
            <Card.Description>Click to navigate</Card.Description>

            <Card.Action>
                <Card.ActionButton aria-label="More actions">
                    <IconDotsVertical size={20} />
                </Card.ActionButton>
            </Card.Action>
        </Card.Root>
    ),
};

export const NonInteractive: Story = {
    decorators: singleCardDecorators,
    render: () => (
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
                <Card.ActionButton aria-label="More actions">
                    <IconDotsVertical size={20} />
                </Card.ActionButton>
            </Card.Action>
        </Card.Root>
    ),
};

export const FullExample: Story = {
    decorators: singleCardDecorators,
    render: () => {
        const [selected, setSelected] = useState(false);

        return (
            <Card.Root href="#" selected={selected} onSelect={() => setSelected((s) => !s)}>
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
                    <Card.ActionButton aria-label="Settings">
                        <IconCog size={20} />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Card.ActionButton aria-label="More actions">
                                <IconDotsVertical size={20} />
                            </Card.ActionButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Duplicate</Dropdown.Item>
                            <hr />
                            <Dropdown.Item onSelect={() => {}}>
                                <span className="tw-text-error">Delete</span>
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Card.Action>
            </Card.Root>
        );
    },
};
