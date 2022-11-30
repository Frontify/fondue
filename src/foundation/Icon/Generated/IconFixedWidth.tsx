import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFixedWidth12 from './IconFixedWidth12';
import IconFixedWidth16 from './IconFixedWidth16';
import IconFixedWidth20 from './IconFixedWidth20';
import IconFixedWidth24 from './IconFixedWidth24';
import IconFixedWidth32 from './IconFixedWidth32'

function IconFixedWidth(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFixedWidth12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconFixedWidth16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconFixedWidth20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconFixedWidth24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconFixedWidth32 {...props}/>}
        </span>
    );
}

export default memo(IconFixedWidth);