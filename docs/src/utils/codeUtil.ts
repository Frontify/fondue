/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Component } from '#contentlayer/generated';

export const getImportStatement = (props: Component) => {
    if (props.type === 'Component' && props.exportedName) {
        return `import { ${props.exportedName} } from '@frontify/fondue/components';`;
    }
    return '';
};
