import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBox12 from './IconBox12';
import IconBox16 from './IconBox16';
import IconBox20 from './IconBox20';
import IconBox24 from './IconBox24';
import IconBox32 from './IconBox32'

function IconBox(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBox12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconBox16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconBox20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconBox24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconBox32 {...props}/>}
        </span>
    );
}

export default memo(IconBox);