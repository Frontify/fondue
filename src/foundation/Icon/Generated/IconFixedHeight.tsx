import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFixedHeight12 from './IconFixedHeight12';
import IconFixedHeight16 from './IconFixedHeight16';
import IconFixedHeight20 from './IconFixedHeight20';
import IconFixedHeight24 from './IconFixedHeight24';
import IconFixedHeight32 from './IconFixedHeight32'

function IconFixedHeight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFixedHeight12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconFixedHeight16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconFixedHeight20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconFixedHeight24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconFixedHeight32 {...props}/>}
        </span>
    );
}

export default memo(IconFixedHeight);