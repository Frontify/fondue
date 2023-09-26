/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from './Tooltip';
import IconExclamationMarkTriangle16 from '@foundation/Icon/Generated/IconExclamationMarkTriangle16';
import { Box } from '@components/Box';

const TOOLTIP_CONTENT_ID = '[data-test-id=fondue-tooltip-content]';

describe('Tooltip Component', () => {
    it('should render correctly', () => {
        cy.mount(
            <Tooltip open={true}>
                <Tooltip.Trigger>
                    <IconExclamationMarkTriangle16 />
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <Box className="tw-p-2 tw-text-text">
                        <p>Some Content</p>
                    </Box>
                </Tooltip.Content>
            </Tooltip>,
        );

        cy.get(TOOLTIP_CONTENT_ID).should('exist');
    });
});
