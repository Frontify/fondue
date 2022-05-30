import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDividerSolid12 from './IconDividerSolid12';
import IconDividerSolid16 from './IconDividerSolid16';
import IconDividerSolid20 from './IconDividerSolid20';
import IconDividerSolid24 from './IconDividerSolid24';
import IconDividerSolid32 from './IconDividerSolid32'

function IconDividerSolid(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDividerSolid12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconDividerSolid16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconDividerSolid20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconDividerSolid24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconDividerSolid32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconDividerSolid);
export default Memo;