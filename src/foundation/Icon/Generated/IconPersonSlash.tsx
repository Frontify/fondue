import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPersonSlash12 from './IconPersonSlash12';
import IconPersonSlash16 from './IconPersonSlash16';
import IconPersonSlash20 from './IconPersonSlash20';
import IconPersonSlash24 from './IconPersonSlash24';
import IconPersonSlash32 from './IconPersonSlash32'

function IconPersonSlash(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPersonSlash12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconPersonSlash16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconPersonSlash20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconPersonSlash24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconPersonSlash32 {...props}/>}
        </span>
    );
}

export default memo(IconPersonSlash);