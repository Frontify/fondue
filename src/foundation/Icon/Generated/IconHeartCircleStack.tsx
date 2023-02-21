import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconHeartCircleStack12 from './IconHeartCircleStack12';
import IconHeartCircleStack16 from './IconHeartCircleStack16';
import IconHeartCircleStack20 from './IconHeartCircleStack20';
import IconHeartCircleStack24 from './IconHeartCircleStack24';
import IconHeartCircleStack32 from './IconHeartCircleStack32';

const IconHeartCircleStack = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconHeartCircleStack12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconHeartCircleStack16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconHeartCircleStack20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconHeartCircleStack24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconHeartCircleStack32 {...props} />}
        </span>
    );
};

const MemoizedIconHeartCircleStack = memo(IconHeartCircleStack);
MemoizedIconHeartCircleStack.displayName = 'FondueIconHeartCircleStack';

export default MemoizedIconHeartCircleStack;
