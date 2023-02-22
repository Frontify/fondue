import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconClockList12 from './IconClockList12';
import IconClockList16 from './IconClockList16';
import IconClockList20 from './IconClockList20';
import IconClockList24 from './IconClockList24';
import IconClockList32 from './IconClockList32';

const IconClockList = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconClockList12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconClockList16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconClockList20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconClockList24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconClockList32 {...props} />}
        </span>
    );
};
IconClockList.displayName = 'FondueIconClockList';

export default memo(IconClockList);
