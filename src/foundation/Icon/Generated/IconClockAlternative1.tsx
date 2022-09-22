import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconClockAlternative112 from './IconClockAlternative112';
import IconClockAlternative116 from './IconClockAlternative116';
import IconClockAlternative120 from './IconClockAlternative120';
import IconClockAlternative124 from './IconClockAlternative124';
import IconClockAlternative132 from './IconClockAlternative132'

function IconClockAlternative1(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconClockAlternative112 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconClockAlternative116 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconClockAlternative120 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconClockAlternative124 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconClockAlternative132 {...props}/>}
        </span>
    );
}

export default memo(IconClockAlternative1);