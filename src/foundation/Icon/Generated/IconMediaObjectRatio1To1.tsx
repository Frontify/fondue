import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectRatio1To112 from './IconMediaObjectRatio1To112';
import IconMediaObjectRatio1To116 from './IconMediaObjectRatio1To116';
import IconMediaObjectRatio1To120 from './IconMediaObjectRatio1To120';
import IconMediaObjectRatio1To124 from './IconMediaObjectRatio1To124';
import IconMediaObjectRatio1To132 from './IconMediaObjectRatio1To132'

function IconMediaObjectRatio1To1(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectRatio1To112 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectRatio1To116 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectRatio1To120 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectRatio1To124 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectRatio1To132 {...props}/>}
        </span>
    );
}

const Memo = memo(IconMediaObjectRatio1To1);
export default Memo;