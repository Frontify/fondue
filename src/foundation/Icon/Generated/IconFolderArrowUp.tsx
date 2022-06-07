import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFolderArrowUp12 from './IconFolderArrowUp12';
import IconFolderArrowUp16 from './IconFolderArrowUp16';
import IconFolderArrowUp20 from './IconFolderArrowUp20';
import IconFolderArrowUp24 from './IconFolderArrowUp24';
import IconFolderArrowUp32 from './IconFolderArrowUp32'

function IconFolderArrowUp(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFolderArrowUp12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconFolderArrowUp16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconFolderArrowUp20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconFolderArrowUp24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconFolderArrowUp32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconFolderArrowUp);
export default Memo;