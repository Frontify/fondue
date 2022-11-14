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
        } && <${component.name} {...props}/>}`;
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
    return `import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

${importsTsx(props.components)}

function ${props.name}(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            ${componentsTsx(props.components)}
        </span>
    );
}

export default memo(${props.name});`;
};
