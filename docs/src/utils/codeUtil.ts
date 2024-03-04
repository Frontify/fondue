/* (c) Copyright Frontify Ltd., all rights reserved. */

import { COMPONENT_IMPORT_PATH } from '#/constants';
import { type Component } from '#contentlayer/generated';

export const getImportStatement = (props: Component) => {
    const additionalExports = props.additionalExports ? `, ${props.additionalExports}` : "";
    return `import { ${props.title}${props.additionalExports?additionalExports:""} } from '${COMPONENT_IMPORT_PATH}';`;
};
