/* (c) Copyright Frontify Ltd., all rights reserved. */

import { COMPONENT_IMPORT_PATH } from '#/constants';
import { type Component } from '#contentlayer/generated';

export const getImportStatement = (props: Component) => {
    return `import { ${props.title} } from '${COMPONENT_IMPORT_PATH}';`;
};
