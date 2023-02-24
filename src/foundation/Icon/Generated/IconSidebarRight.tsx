import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSidebarRight12 from './IconSidebarRight12';
import IconSidebarRight16 from './IconSidebarRight16';
import IconSidebarRight20 from './IconSidebarRight20';
import IconSidebarRight24 from './IconSidebarRight24';
import IconSidebarRight32 from './IconSidebarRight32';

const IconSidebarRight = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSidebarRight12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSidebarRight16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSidebarRight20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSidebarRight24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSidebarRight32 {...props} />}
        </span>
    );
};
IconSidebarRight.displayName = 'FondueIconSidebarRight';

export default memo(IconSidebarRight);
