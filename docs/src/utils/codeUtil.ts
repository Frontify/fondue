/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Component } from '#contentlayer/generated';

export const getImportStatement = (props: Component) => {
    return `import { ${props.exportedName} } from '@frontify/fondue/components';`;
};
