import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSidebarRightShow12Filled from './IconSidebarRightShow12Filled';
import IconSidebarRightShow12 from './IconSidebarRightShow12';
import IconSidebarRightShow16Filled from './IconSidebarRightShow16Filled';
import IconSidebarRightShow16 from './IconSidebarRightShow16';
import IconSidebarRightShow20Filled from './IconSidebarRightShow20Filled';
import IconSidebarRightShow20 from './IconSidebarRightShow20';
import IconSidebarRightShow24Filled from './IconSidebarRightShow24Filled';
import IconSidebarRightShow24 from './IconSidebarRightShow24';
import IconSidebarRightShow32Filled from './IconSidebarRightShow32Filled';
import IconSidebarRightShow32 from './IconSidebarRightShow32'

function IconSidebarRightShow(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconSidebarRightShow12Filled {...props}/>}
            {size === IconSize.Size12 && !props.filled && <IconSidebarRightShow12 {...props}/>}
            {size === IconSize.Size16 && props.filled && <IconSidebarRightShow16Filled {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconSidebarRightShow16 {...props}/>}
            {size === IconSize.Size20 && props.filled && <IconSidebarRightShow20Filled {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconSidebarRightShow20 {...props}/>}
            {size === IconSize.Size24 && props.filled && <IconSidebarRightShow24Filled {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconSidebarRightShow24 {...props}/>}
            {size === IconSize.Size32 && props.filled && <IconSidebarRightShow32Filled {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconSidebarRightShow32 {...props}/>}
        </span>
    );
}

export default memo(IconSidebarRightShow);