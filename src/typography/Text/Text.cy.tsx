/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Box } from '@components/index';
import { Text } from './Text';
import { BOX_BG_ALIAS_TOKENS_CLASSES, BOX_TEXT_ALIAS_TOKENS_CLASSES } from '@utilities/tokens';

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
