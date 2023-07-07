import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSquare12 from './IconSquare12';
import IconSquare16 from './IconSquare16';
import IconSquare20 from './IconSquare20';
import IconSquare24 from './IconSquare24';
import IconSquare32 from './IconSquare32'

function IconSquare(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSquare12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconSquare16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconSquare20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconSquare24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconSquare32 {...props}/>}
        </span>
    );
}

export default memo(IconSquare);