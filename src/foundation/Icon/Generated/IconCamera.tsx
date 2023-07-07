import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCamera12 from './IconCamera12';
import IconCamera16 from './IconCamera16';
import IconCamera20 from './IconCamera20';
import IconCamera24 from './IconCamera24';
import IconCamera32 from './IconCamera32'

function IconCamera(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCamera12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconCamera16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconCamera20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconCamera24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconCamera32 {...props}/>}
        </span>
    );
}

export default memo(IconCamera);