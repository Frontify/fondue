import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconH12 from './IconH12';
import IconH16 from './IconH16';
import IconH20 from './IconH20';
import IconH24 from './IconH24';
import IconH32 from './IconH32'

function IconH(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconH12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconH16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconH20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconH24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconH32 {...props}/>}
        </span>
    );
}

export default memo(IconH);