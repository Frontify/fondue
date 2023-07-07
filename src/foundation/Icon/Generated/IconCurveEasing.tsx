import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCurveEasing12 from './IconCurveEasing12';
import IconCurveEasing16 from './IconCurveEasing16';
import IconCurveEasing20 from './IconCurveEasing20';
import IconCurveEasing24 from './IconCurveEasing24';
import IconCurveEasing32 from './IconCurveEasing32'

function IconCurveEasing(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCurveEasing12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconCurveEasing16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconCurveEasing20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconCurveEasing24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconCurveEasing32 {...props}/>}
        </span>
    );
}

export default memo(IconCurveEasing);