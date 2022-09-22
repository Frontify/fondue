import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPlusFrame12 from './IconPlusFrame12';
import IconPlusFrame16 from './IconPlusFrame16';
import IconPlusFrame20 from './IconPlusFrame20';
import IconPlusFrame24 from './IconPlusFrame24';
import IconPlusFrame32 from './IconPlusFrame32'

function IconPlusFrame(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPlusFrame12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconPlusFrame16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconPlusFrame20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconPlusFrame24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconPlusFrame32 {...props}/>}
        </span>
    );
}

export default memo(IconPlusFrame);