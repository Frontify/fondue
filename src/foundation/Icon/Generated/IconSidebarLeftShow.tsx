import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSidebarLeftShow12Filled from './IconSidebarLeftShow12Filled';
import IconSidebarLeftShow12 from './IconSidebarLeftShow12';
import IconSidebarLeftShow16Filled from './IconSidebarLeftShow16Filled';
import IconSidebarLeftShow16 from './IconSidebarLeftShow16';
import IconSidebarLeftShow20Filled from './IconSidebarLeftShow20Filled';
import IconSidebarLeftShow20 from './IconSidebarLeftShow20';
import IconSidebarLeftShow24Filled from './IconSidebarLeftShow24Filled';
import IconSidebarLeftShow24 from './IconSidebarLeftShow24';
import IconSidebarLeftShow32Filled from './IconSidebarLeftShow32Filled';
import IconSidebarLeftShow32 from './IconSidebarLeftShow32';

const IconSidebarLeftShow = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconSidebarLeftShow12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconSidebarLeftShow12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconSidebarLeftShow16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSidebarLeftShow16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconSidebarLeftShow20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSidebarLeftShow20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconSidebarLeftShow24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSidebarLeftShow24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconSidebarLeftShow32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSidebarLeftShow32 {...props} />}
        </span>
    );
};
IconSidebarLeftShow.displayName = 'FondueIconSidebarLeftShow';

export default memo(IconSidebarLeftShow);
