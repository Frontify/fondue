/* (c) Copyright Frontify Ltd., all rights reserved. */

export type IconComponent = {
    size: string | null;
    filled: boolean;
    name: string;
};

type IconShapeTemplateInputs = {
    name: string;
    components: Array<IconComponent>;
};

const componentsTsx = (components: Array<IconComponent>) => {
    return components.map((component: IconComponent) => {
        return `{size === IconSize.Size${component.size} && ${
            component.filled ? 'props.filled' : '!props.filled'
        } && <${component.name} {...props} />}`;
    }).join(`
            `);
};

const importsTsx = (components: Array<IconComponent>) => {
    return components
        .map((component: IconComponent) => {
            return `import ${component.name} from './${component.name}'`;
        })
        .join(';\n');
};

export const IconTemplateDynamic = (props: IconShapeTemplateInputs) => {
    return `import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

${importsTsx(props.components)};

const ${props.name} = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            ${componentsTsx(props.components)}
        </span>
    );
};

const Memoized${props.name} = memo(${props.name});
Memoized${props.name}.displayName = 'Fondue${props.name}';

export default Memoized${props.name};
`;
};
