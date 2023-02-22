import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBuilding12 from './IconBuilding12';
import IconBuilding16 from './IconBuilding16';
import IconBuilding20 from './IconBuilding20';
import IconBuilding24 from './IconBuilding24';
import IconBuilding32 from './IconBuilding32';

const IconBuilding = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBuilding12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBuilding16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBuilding20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBuilding24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBuilding32 {...props} />}
        </span>
    );
};
IconBuilding.displayName = 'FondueIconBuilding';

export default memo(IconBuilding);
