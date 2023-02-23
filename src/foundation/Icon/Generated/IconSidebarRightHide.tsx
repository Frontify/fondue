import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSidebarRightHide12Filled from './IconSidebarRightHide12Filled';
import IconSidebarRightHide12 from './IconSidebarRightHide12';
import IconSidebarRightHide16Filled from './IconSidebarRightHide16Filled';
import IconSidebarRightHide16 from './IconSidebarRightHide16';
import IconSidebarRightHide20Filled from './IconSidebarRightHide20Filled';
import IconSidebarRightHide20 from './IconSidebarRightHide20';
import IconSidebarRightHide24Filled from './IconSidebarRightHide24Filled';
import IconSidebarRightHide24 from './IconSidebarRightHide24';
import IconSidebarRightHide32Filled from './IconSidebarRightHide32Filled';
import IconSidebarRightHide32 from './IconSidebarRightHide32';

const IconSidebarRightHide = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconSidebarRightHide12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconSidebarRightHide12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconSidebarRightHide16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSidebarRightHide16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconSidebarRightHide20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSidebarRightHide20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconSidebarRightHide24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSidebarRightHide24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconSidebarRightHide32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSidebarRightHide32 {...props} />}
        </span>
    );
};
IconSidebarRightHide.displayName = 'FondueIconSidebarRightHide';

export default memo(IconSidebarRightHide);
