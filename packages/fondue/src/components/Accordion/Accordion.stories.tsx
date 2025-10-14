/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { type ReactElement, type ReactNode, useState } from 'react';
import { action } from 'storybook/actions';

import { AssetInput, AssetInputSize } from '@components/AssetInput/AssetInput';
import { assetInputActions } from '@components/AssetInput/asset-input-actions';
import { Button } from '@components/Button/Button';
import { ColorPickerFlyout as ColorPickerFlyoutComponent } from '@components/ColorInputFlyout/ColorPickerFlyout';
import { EXAMPLE_PALETTES } from '@components/ColorPicker/example-palettes';
import { DatePicker } from '@components/DatePicker';
import { Dropdown } from '@components/Dropdown';
import { FormControl } from '@components/FormControl/FormControl';
import { ScrollWrapper } from '@components/ScrollWrapper';
import { SegmentedControls } from '@components/SegmentedControls/SegmentedControls';
import { Switch } from '@components/Switch/Switch';
import { TextInput, TextInputType } from '@components/TextInput/TextInput';
import IconIcon from '@foundation/Icon/Generated/IconIcon';
import IconTextAlignmentCentre from '@foundation/Icon/Generated/IconTextAlignmentCentre';
import IconTextAlignmentLeft from '@foundation/Icon/Generated/IconTextAlignmentLeft';
import IconTextAlignmentRight from '@foundation/Icon/Generated/IconTextAlignmentRight';
import { IconSize } from '@foundation/Icon/IconSize';
import { LegacyStack } from '@layout/LegacyStack';
import { merge } from '@utilities/merge';

import { type Color } from '../../types';
import { EXAMPLE_IMAGES } from '../AssetInput/example-assets';

import { Accordion as AccordionComponent, AccordionItem } from './Accordion';
import { AccordionHeaderIcon } from './AccordionHeaderIcon';
import { type AccordionHeaderProps, type AccordionProps } from './types';

/**
 ### This component is deprecated, please use the [new Accordion component](/docs/current_components-accordion--documentation) instead.
 */
export default {
    title: 'Components/Accordion',
    component: AccordionComponent,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<AccordionProps>;

export const WithDifferentAccordionItems: StoryFn<AccordionProps> = () => {
    const [showContent, setShowContent] = useState(true);
    const [input, setInput] = useState('');
    const [activeItemId, setActiveItemId] = useState<string | number | undefined>();
    const [temporaryColor, setTemporaryColor] = useState<Color | null>({ red: 0, green: 146, blue: 120 });
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>();

    return (
        <AccordionComponent>
            <AccordionItem
                header={{
                    children: 'Item with decorator, type Accordion and a FormControl child',
                    decorator: <IconIcon />,
                    active: true,
                }}
                divider
            >
                <FormControl
                    label={{ children: 'Width', htmlFor: 'width', tooltip: { content: 'Width of the future' } }}
                    extra="Some extra text."
                    helper={{ text: 'This input should always equal to 42.' }}
                >
                    <TextInput value={input} onChange={setInput} />
                </FormControl>
            </AccordionItem>
            <AccordionItem header={{ children: 'Item with plain text child', active: true }}>bar</AccordionItem>
            <AccordionItem header={{ children: 'Item with dropdown child' }}>
                <Dropdown
                    onChange={(id) => setActiveItemId(id)}
                    activeItemId={activeItemId}
                    menuBlocks={[
                        {
                            id: 'block1',
                            menuItems: [
                                { id: '1', title: 'Item 1' },
                                { id: '2', title: 'Item 2' },
                                { id: '3', title: 'Item 3' },
                                { id: '4', title: 'Item 4' },
                                { id: '5', title: 'Item 5' },
                            ],
                        },
                    ]}
                />
            </AccordionItem>
            <AccordionItem header={{ children: 'Item with datepicker child' }}>
                <ScrollWrapper>
                    <DatePicker
                        variant="single"
                        startDate={null}
                        endDate={null}
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                    />
                </ScrollWrapper>
            </AccordionItem>
            <AccordionItem header={{ children: 'Item with assetinput' }}>
                <AssetInput size={AssetInputSize.Large} assets={[EXAMPLE_IMAGES[0]]} actions={assetInputActions} />
            </AccordionItem>
            <AccordionItem header={{ children: 'Item with color picker flyout' }}>
                <ColorPickerFlyoutComponent
                    disabled={false}
                    currentColor={temporaryColor}
                    onClick={() => setSelectedColor(temporaryColor)}
                    onClose={() => setTemporaryColor(selectedColor)}
                    onSelect={(color) => setTemporaryColor(color)}
                    palettes={EXAMPLE_PALETTES}
                />
            </AccordionItem>
            <AccordionItem
                header={{
                    children: 'Empty item with an onClick callback',
                    onClick: action('click'),
                }}
            />
            <AccordionItem header={{ children: 'Item with resizable content' }}>
                <div className={!showContent ? 'tw-hidden' : ''}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <Button onClick={() => setShowContent(!showContent)}>Toggle Content</Button>
            </AccordionItem>
            <AccordionItem header={{ children: 'Item without padding' }} padding={false}>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </AccordionItem>
        </AccordionComponent>
    );
};

const customHeader = ({ isOpen, children }: AccordionHeaderProps): ReactElement => (
    <div
        className={merge([
            'tw-px-6 tw-py-4 tw-bg-black-5 tw-flex tw-justify-between tw-font-bold tw-items-center',
            isOpen ? 'tw-text-black' : 'tw-text-black-60',
        ])}
    >
        {children}
        <AccordionHeaderIcon isOpen={isOpen} size="small" />
    </div>
);

const Code = ({ children }: { children: ReactNode }): ReactElement => (
    <code className="tw-bg-black-5 tw-rounded tw-px-2 tw-text-box-negative-strong tw-text-s">{children}</code>
);

const PropsTable = ({ rows }: { rows: [ReactNode, ReactNode, ReactNode][] }): ReactElement => (
    <table className="tw-table-fixed tw-border tw-border-black-10 tw-my-4">
        <thead className="tw-bg-black-5">
            <tr className="tw-p-3 tw-border-b tw-border-b-black-10">
                <th className="tw-p-3 tw-w-[10%]">Property</th>
                <th className="tw-p-3 tw-w-[10%]">Type</th>
                <th className="tw-p-3">Description</th>
            </tr>
        </thead>
        <tbody>
            {rows.map(([property, type, description], index) => (
                <tr className="tw-p-3 tw-border-b tw-border-b-black-10" key={`row-${index}`}>
                    <td className="tw-p-3 tw-font-bold">{property}</td>
                    <td className="tw-p-3">
                        <Code>{type}</Code>
                    </td>
                    <td className="tw-p-3">{description}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export const WithCustomAccordionHeaderComponent: StoryFn<AccordionProps> = () => (
    <AccordionComponent>
        <AccordionItem
            header={{
                children: 'Item with a custom headerComponent prop',
                decorator: <IconIcon />,
                active: true,
            }}
            divider
            padding={false}
            headerComponent={customHeader}
        >
            <div className="tw-p-5">
                <p>
                    For maximum flexibility, you can create your own <Code>headerComponent</Code> to pass to the&nbsp;
                    <Code>Accordion Item</Code>.
                </p>
                <p>
                    Import the <Code>AccordionHeaderProps</Code> type to assist in building it to be typesafe.
                </p>
                <p>
                    The properties that are available in the <Code>headerComponent</Code> are as follows:
                </p>
                <PropsTable
                    rows={[
                        [
                            'isOpen',
                            'boolean',
                            <span key="row-isopen-desc">
                                The state of the <Code>AccordionItem</Code> this <Code>headerComponent</Code>
                                belongs to.
                            </span>,
                        ],
                        [
                            'children',
                            'string',
                            <span key="row-children-desc">
                                The children property that is passed in via the <Code>header</Code> prop to the&nbsp;
                                <Code>AccordionItem</Code>.
                            </span>,
                        ],

                        [
                            'disabled',
                            'boolean',
                            <span key="row-disabled-desc">
                                The disabled property that is passed in via the <Code>header</Code> prop to the&nbsp;
                                <Code>AccordionItem</Code>.
                            </span>,
                        ],
                        [
                            'decorator',
                            'ReactNode',
                            <span key="row-decorator-desc">
                                The decorator icon property that is passed in via the <Code>header</Code> prop to
                                the&nbsp;
                                <Code>AccordionItem</Code>.
                            </span>,
                        ],
                    ]}
                />
                <p>
                    The <Code>AccordionHeaderIcon</Code> is also available for consumption inside of the
                    <Code>headerComponent</Code>. The properties that are consumed by the&nbsp;
                    <Code>AccordionHeaderIcon</Code> are listed below.
                </p>
            </div>
        </AccordionItem>
        <AccordionItem
            header={{
                children: 'AccordionHeaderIcon Details',
                decorator: <IconIcon />,
                active: true,
            }}
            divider
            padding={false}
            headerComponent={customHeader}
        >
            <div className="tw-p-5">
                <p>
                    The following table contains properties that are consumed by the&nbsp;
                    <Code>AccordionHeaderIcon</Code>.
                </p>
                <PropsTable
                    rows={[
                        [
                            'isOpen',
                            'boolean',
                            <span key="icon-isopen-desc">
                                Modifies/Animates the component based on the state of the <Code>AccordionItem</Code>
                                &nbsp; this <Code>headerComponent</Code>
                                belongs to.
                            </span>,
                        ],
                        ['disabled', 'boolean', 'Displays the component with disabled styles.'],
                        [
                            'size',
                            'AccordionHeaderIconSize',
                            'Determines the size of the component (small | medium | large).',
                        ],
                    ]}
                />
            </div>
        </AccordionItem>
    </AccordionComponent>
);

export const WithAccordionItemAddition: StoryFn<
    AccordionProps & {
        'Accordion Divider': boolean;
        'Accordion Border': boolean;
        'Item Divider': boolean;
    }
> = (args) => {
    const AccordtionItemsStart = [
        <AccordionItem
            key={1}
            header={{ children: 'Accordion Divider & Border', active: true }}
            divider={args['Item Divider']}
        >
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>,
        <AccordionItem
            key={2}
            header={{ children: 'AccordionItem Divider', active: true }}
            divider={args['Item Divider']}
        >
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>AccordionItem</Code> will add a divider between the
                header and content of the <Code>AccordionItem</Code> when it is open.
                <Code>Accordion</Code>.
            </div>
        </AccordionItem>,
        <AccordionItem key={3} header={{ children: 'Additional Info', active: true }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Play around with the settings below to see the difference between these three properties. The&nbsp;
                <Code>Accordion</Code> Ccomponent has the <Code>divider</Code> and <Code>border</Code> set to true by
                default, whereas the&nbsp;
                <Code>AccordionItem</Code> has the divider set to false by default.
            </div>
        </AccordionItem>,
    ];

    const newItemOpen = (key: number) => (
        <AccordionItem key={key} header={{ children: 'I Should be open', active: true }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>
    );

    const inactive = (
        <AccordionItem
            key={10}
            header={{ children: 'I should be closed', active: false }}
            divider={args['Item Divider']}
        >
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>
    );

    const elementWithoutActive = (
        <AccordionItem key={22} header={{ children: 'I should also be closed' }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>
    );

    const [accordionItem, setAccordionItem] = useState(AccordtionItemsStart);
    const [accordionKey, setAccordionKey] = useState(5);
    return (
        <span>
            <AccordionComponent divider={args['Accordion Divider']} border={args['Accordion Border']}>
                {accordionItem.map((item) => item)}
            </AccordionComponent>
            <LegacyStack padding="xs" spacing="xs">
                <Button
                    onClick={() => {
                        setAccordionKey(accordionKey + 1);
                        setAccordionItem([...accordionItem, newItemOpen(accordionKey)]);
                    }}
                >
                    Add Element active
                </Button>
                <Button onClick={() => setAccordionItem([...accordionItem, inactive])}>Add Element inactive</Button>
                <Button onClick={() => setAccordionItem([...accordionItem, elementWithoutActive])}>
                    Add Element without active prop
                </Button>
                <Button onClick={() => setAccordionItem([...accordionItem.slice(0, accordionItem.length - 1)])}>
                    Remove an Element from the Accordion
                </Button>
            </LegacyStack>
        </span>
    );
};

export const WithDividers: StoryFn<
    AccordionProps & {
        'Accordion Divider': boolean;
        'Accordion Border': boolean;
        'Item Divider': boolean;
    }
> = (args) => (
    <AccordionComponent divider={args['Accordion Divider']} border={args['Accordion Border']}>
        <AccordionItem header={{ children: 'Accordion Divider & Border', active: true }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>
        <AccordionItem header={{ children: 'AccordionItem Divider' }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>AccordionItem</Code> will add a divider between the
                header and content of the <Code>AccordionItem</Code> when it is open.
                <Code>Accordion</Code>.
            </div>
        </AccordionItem>
        <AccordionItem header={{ children: 'Additional Info' }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Play around with the settings below to see the difference between these three properties. The&nbsp;
                <Code>Accordion</Code> Ccomponent has the <Code>divider</Code> and <Code>border</Code> set to true by
                default, whereas the&nbsp;
                <Code>AccordionItem</Code> has the divider set to false by default.
            </div>
        </AccordionItem>
    </AccordionComponent>
);

WithDividers.args = {
    'Accordion Divider': true,
    'Accordion Border': true,
    'Item Divider': false,
};

export const WithAdvancedFormControls: StoryFn<AccordionProps> = () => {
    const [spacing, setSpacing] = useState('1');
    const [showAdvancedSpacing, setShowAdvancedSpacing] = useState(false);
    const [alignment, setAlignment] = useState('l');

    return (
        <AccordionComponent>
            <AccordionItem header={{ children: 'Layout' }}>
                <FormControl
                    label={{ children: 'Spacing', htmlFor: 'spacing' }}
                    extra={
                        <Switch
                            label="advanced"
                            mode={showAdvancedSpacing ? 'on' : 'off'}
                            size="small"
                            onChange={() => setShowAdvancedSpacing(!showAdvancedSpacing)}
                        />
                    }
                    helper={{ text: 'Defines the spacing between elements.' }}
                >
                    <div className="flex items-center h-11 relative">
                        {showAdvancedSpacing ? (
                            <div className="w-full">
                                <TextInput id="spacing" decorator="px" type={TextInputType.Number} />
                            </div>
                        ) : (
                            <SegmentedControls
                                id="spacing"
                                onChange={setSpacing}
                                activeItemId={spacing}
                                items={[
                                    { id: '1', value: 'S' },
                                    { id: '2', value: 'M' },
                                    { id: '3', value: 'L' },
                                ]}
                            />
                        )}
                    </div>
                </FormControl>
            </AccordionItem>
            <AccordionItem header={{ children: 'Alignment' }}>
                <FormControl label={{ children: 'Text', htmlFor: 'text-alignment' }}>
                    <SegmentedControls
                        onChange={setAlignment}
                        activeItemId={alignment}
                        items={[
                            {
                                id: 'l',
                                icon: <IconTextAlignmentLeft size={IconSize.Size16} />,
                                ariaLabel: 'Text Align Left',
                            },
                            {
                                id: 'c',
                                icon: <IconTextAlignmentCentre size={IconSize.Size16} />,
                                ariaLabel: 'Text Align Center',
                            },
                            {
                                id: 'r',
                                icon: <IconTextAlignmentRight size={IconSize.Size16} />,
                                ariaLabel: 'Text Align Right',
                            },
                        ]}
                    />
                </FormControl>
            </AccordionItem>
        </AccordionComponent>
    );
};
