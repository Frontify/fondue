import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowFitTopLeft12 from './IconArrowFitTopLeft12';
import IconArrowFitTopLeft16 from './IconArrowFitTopLeft16';
import IconArrowFitTopLeft20 from './IconArrowFitTopLeft20';
import IconArrowFitTopLeft24 from './IconArrowFitTopLeft24';
import IconArrowFitTopLeft32 from './IconArrowFitTopLeft32'

function IconArrowFitTopLeft(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowFitTopLeft12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconArrowFitTopLeft16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconArrowFitTopLeft20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconArrowFitTopLeft24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconArrowFitTopLeft32 {...props}/>}
        </span>
    );
}

export default memo(IconArrowFitTopLeft);