import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSidebarLeftHide12Filled from './IconSidebarLeftHide12Filled';
import IconSidebarLeftHide12 from './IconSidebarLeftHide12';
import IconSidebarLeftHide16Filled from './IconSidebarLeftHide16Filled';
import IconSidebarLeftHide16 from './IconSidebarLeftHide16';
import IconSidebarLeftHide20Filled from './IconSidebarLeftHide20Filled';
import IconSidebarLeftHide20 from './IconSidebarLeftHide20';
import IconSidebarLeftHide24Filled from './IconSidebarLeftHide24Filled';
import IconSidebarLeftHide24 from './IconSidebarLeftHide24';
import IconSidebarLeftHide32Filled from './IconSidebarLeftHide32Filled';
import IconSidebarLeftHide32 from './IconSidebarLeftHide32'

function IconSidebarLeftHide(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconSidebarLeftHide12Filled {...props}/>}
            {size === IconSize.Size12 && !props.filled && <IconSidebarLeftHide12 {...props}/>}
            {size === IconSize.Size16 && props.filled && <IconSidebarLeftHide16Filled {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconSidebarLeftHide16 {...props}/>}
            {size === IconSize.Size20 && props.filled && <IconSidebarLeftHide20Filled {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconSidebarLeftHide20 {...props}/>}
            {size === IconSize.Size24 && props.filled && <IconSidebarLeftHide24Filled {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconSidebarLeftHide24 {...props}/>}
            {size === IconSize.Size32 && props.filled && <IconSidebarLeftHide32Filled {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconSidebarLeftHide32 {...props}/>}
        </span>
    );
}

export default memo(IconSidebarLeftHide);