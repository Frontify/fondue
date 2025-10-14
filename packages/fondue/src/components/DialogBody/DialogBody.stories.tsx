/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { DIALOG_PADDING, type DialogBodyProps } from '../../types';

import { DialogBody } from './DialogBody';

/**
 ### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead.
 */
export default {
    title: 'Experimental/DialogBody',
    component: DialogBody,
    tags: ['autodocs'],
    argTypes: {
        maxHeight: {
            type: 'number',
        },
        padding: {
            options: ['none', ...DIALOG_PADDING],
            control: { type: 'select' },
        },
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<DialogBodyProps>;

const Template: StoryFn<DialogBodyProps> = (args) => (
    <DialogBody {...args}>
        <p>Hello</p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at, beatae blanditiis cupiditate ducimus,
            excepturi magni mollitia nobis non nulla provident quibusdam veniam! Enim maxime nisi quo reprehenderit
            tenetur ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam aliquid,
            blanditiis, consectetur dignissimos doloremque dolorum esse eveniet explicabo facere laudantium nobis
            quaerat quas quidem quis suscipit temporibus veritatis voluptates? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Aliquid aperiam consectetur corporis, cum dignissimos dolores est impedit magnam minus
            nemo nobis perspiciatis quibusdam quis recusandae similique tempora unde ut veniam!
        </p>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at, beatae blanditiis cupiditate ducimus,
            excepturi magni mollitia nobis non nulla provident quibusdam veniam! Enim maxime nisi quo reprehenderit
            tenetur ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam aliquid,
            blanditiis, consectetur dignissimos doloremque dolorum esse eveniet explicabo facere laudantium nobis
            quaerat quas quidem quis suscipit temporibus veritatis voluptates? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Aliquid aperiam consectetur corporis, cum dignissimos dolores est impedit magnam minus
            nemo nobis perspiciatis quibusdam quis recusandae similique tempora unde ut veniam!
        </p>
    </DialogBody>
);

export const Default = Template.bind({});
export const WithMaxHeight = Template.bind({});
WithMaxHeight.args = {
    maxHeight: 200,
};
