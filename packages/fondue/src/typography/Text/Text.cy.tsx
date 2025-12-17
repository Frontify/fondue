/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Box } from '@components/Box/Box';

import { Text } from './Text';

const classRecord = {
    color: ['weak', 'tw-text-text-weak'],
    overflow: ['ellipsis', 'tw-text-ellipsis'],
    whitespace: ['nowrap', 'tw-whitespace-nowrap'],
    display: ['block', 'tw-block'],
    wordBreak: ['break-all', 'tw-break-all'],
    decoration: ['underline', 'tw-underline'],
    size: ['small', 'tw-text-body-small'],
    weight: ['strong', 'tw-font-medium'],
};

const BOX_BG_ALIAS_TOKENS_CLASSES = [
    'tw-bg-box-neutral',
    'tw-bg-box-neutral-strong',
    'tw-bg-box-selected',
    'tw-bg-box-selected-strong',
    'tw-bg-box-disabled',
    'tw-bg-box-disabled-strong',
    'tw-bg-box-positive',
    'tw-bg-box-positive-strong',
    'tw-bg-box-negative',
    'tw-bg-box-negative-strong',
    'tw-bg-box-warning',
    'tw-bg-box-warning-strong',
];

const BOX_TEXT_ALIAS_TOKENS_CLASSES = [
    'tw-text-box-neutral-inverse',
    'tw-text-box-neutral-strong-inverse',
    'tw-text-box-selected-inverse',
    'tw-text-box-selected-strong-inverse',
    'tw-text-box-disabled-inverse',
    'tw-text-box-disabled-strong-inverse',
    'tw-text-box-positive-inverse',
    'tw-text-box-positive-strong-inverse',
    'tw-text-box-negative-inverse',
    'tw-text-box-negative-strong-inverse',
    'tw-text-box-warning-inverse',
    'tw-text-box-warning-strong-inverse',
];

const textProps = Object.entries(classRecord).reduce(
    (acc, [key, [value]]) => {
        acc[key] = value;
        return acc;
    },
    {} as Record<string, string>,
);

describe('Text', () => {
    it('should render text as span by default', () => {
        cy.mount(<Text>The fox jumps over the lazy dog</Text>);

        cy.get('[data-test-id=text]').should((el) => el.attr('tagName') === 'SPAN');
    });

    it('should render text as h1 p provided', () => {
        cy.mount(<Text as="p">The fox jumps over the lazy dog</Text>);

        cy.get('[data-test-id=text]').should((el) => el.attr('tagName') === 'P');
    });

    it('should add correct classes to element', () => {
        cy.mount(
            <Text as="p" {...textProps}>
                The fox jumps over the lazy dog
            </Text>,
        );

        cy.get('[data-test-id=text]').should((el) => {
            for (const value of Object.values(classRecord)) {
                expect(el).to.have.class(value[1]);
            }
        });
    });

    it('should render parent wrapper with box token and overwrite text color class with box token inverse', () => {
        cy.mount(
            <Box className={BOX_BG_ALIAS_TOKENS_CLASSES[0]} data-test-id="box-token-parent">
                <Text as="p" {...textProps} boxColor="neutral">
                    The fox jumps over the lazy dog
                </Text>
            </Box>,
        );

        cy.get('[data-test-id=box-token-parent]').should((el) => {
            expect(el).to.have.class(BOX_BG_ALIAS_TOKENS_CLASSES[0]);
        });
        cy.get('[data-test-id=box-token-parent]')
            .children()
            .should((el) => {
                expect(el).to.have.class(BOX_TEXT_ALIAS_TOKENS_CLASSES[0]);
            });
    });
});
