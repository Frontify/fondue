import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDoAndDontBox12 from './IconDoAndDontBox12';
import IconDoAndDontBox16 from './IconDoAndDontBox16';
import IconDoAndDontBox20 from './IconDoAndDontBox20';
import IconDoAndDontBox24 from './IconDoAndDontBox24';
import IconDoAndDontBox32 from './IconDoAndDontBox32'

function IconDoAndDontBox(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDoAndDontBox12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconDoAndDontBox16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconDoAndDontBox20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconDoAndDontBox24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconDoAndDontBox32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconDoAndDontBox);
export default Memo;