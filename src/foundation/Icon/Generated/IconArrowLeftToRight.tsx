import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowLeftToRight12 from './IconArrowLeftToRight12';
import IconArrowLeftToRight16 from './IconArrowLeftToRight16';
import IconArrowLeftToRight20 from './IconArrowLeftToRight20';
import IconArrowLeftToRight24 from './IconArrowLeftToRight24';
import IconArrowLeftToRight32 from './IconArrowLeftToRight32'

function IconArrowLeftToRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowLeftToRight12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconArrowLeftToRight16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconArrowLeftToRight20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconArrowLeftToRight24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconArrowLeftToRight32 {...props}/>}
        </span>
    );
}

export default memo(IconArrowLeftToRight);