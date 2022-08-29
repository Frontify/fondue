import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTypographyMultiple12 from './IconTypographyMultiple12';
import IconTypographyMultiple16 from './IconTypographyMultiple16';
import IconTypographyMultiple20 from './IconTypographyMultiple20';
import IconTypographyMultiple24 from './IconTypographyMultiple24';
import IconTypographyMultiple32 from './IconTypographyMultiple32'

function IconTypographyMultiple(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTypographyMultiple12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconTypographyMultiple16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconTypographyMultiple20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconTypographyMultiple24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconTypographyMultiple32 {...props}/>}
        </span>
    );
}

export default memo(IconTypographyMultiple);