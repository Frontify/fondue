import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDotsVertical12 from './IconDotsVertical12';
import IconDotsVertical16 from './IconDotsVertical16';
import IconDotsVertical20 from './IconDotsVertical20';
import IconDotsVertical24 from './IconDotsVertical24';
import IconDotsVertical32 from './IconDotsVertical32'

function IconDotsVertical(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDotsVertical12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconDotsVertical16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconDotsVertical20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconDotsVertical24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconDotsVertical32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconDotsVertical);
export default Memo;