import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconClipboard12 from './IconClipboard12';
import IconClipboard16 from './IconClipboard16';
import IconClipboard20 from './IconClipboard20';
import IconClipboard24 from './IconClipboard24';
import IconClipboard32 from './IconClipboard32'

function IconClipboard(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconClipboard12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconClipboard16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconClipboard20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconClipboard24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconClipboard32 {...props}/>}
        </span>
    );
}

export default memo(IconClipboard);