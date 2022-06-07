import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCrop12 from './IconCrop12';
import IconCrop16 from './IconCrop16';
import IconCrop20 from './IconCrop20';
import IconCrop24 from './IconCrop24';
import IconCrop32 from './IconCrop32'

function IconCrop(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCrop12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconCrop16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconCrop20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconCrop24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconCrop32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconCrop);
export default Memo;