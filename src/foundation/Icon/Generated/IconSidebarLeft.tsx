import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSidebarLeft12 from './IconSidebarLeft12';
import IconSidebarLeft16 from './IconSidebarLeft16';
import IconSidebarLeft20 from './IconSidebarLeft20';
import IconSidebarLeft24 from './IconSidebarLeft24';
import IconSidebarLeft32 from './IconSidebarLeft32';

const IconSidebarLeft = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSidebarLeft12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSidebarLeft16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSidebarLeft20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSidebarLeft24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSidebarLeft32 {...props} />}
        </span>
    );
};
IconSidebarLeft.displayName = 'FondueIconSidebarLeft';

export default memo(IconSidebarLeft);
