import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFolderArrowRight12 from './IconFolderArrowRight12';
import IconFolderArrowRight16 from './IconFolderArrowRight16';
import IconFolderArrowRight20 from './IconFolderArrowRight20';
import IconFolderArrowRight24 from './IconFolderArrowRight24';
import IconFolderArrowRight32 from './IconFolderArrowRight32'

function IconFolderArrowRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFolderArrowRight12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconFolderArrowRight16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconFolderArrowRight20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconFolderArrowRight24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconFolderArrowRight32 {...props}/>}
        </span>
    );
}

export default memo(IconFolderArrowRight);