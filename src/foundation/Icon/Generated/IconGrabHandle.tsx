import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconGrabHandle12 from './IconGrabHandle12';
import IconGrabHandle16 from './IconGrabHandle16';
import IconGrabHandle20 from './IconGrabHandle20';
import IconGrabHandle24 from './IconGrabHandle24';
import IconGrabHandle32 from './IconGrabHandle32'

function IconGrabHandle(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconGrabHandle12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconGrabHandle16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconGrabHandle20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconGrabHandle24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconGrabHandle32 {...props}/>}
        </span>
    );
}

export default memo(IconGrabHandle);