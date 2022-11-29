import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowFitTopRight12 from './IconArrowFitTopRight12';
import IconArrowFitTopRight16 from './IconArrowFitTopRight16';
import IconArrowFitTopRight20 from './IconArrowFitTopRight20';
import IconArrowFitTopRight24 from './IconArrowFitTopRight24';
import IconArrowFitTopRight32 from './IconArrowFitTopRight32'

function IconArrowFitTopRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowFitTopRight12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconArrowFitTopRight16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconArrowFitTopRight20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconArrowFitTopRight24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconArrowFitTopRight32 {...props}/>}
        </span>
    );
}

export default memo(IconArrowFitTopRight);