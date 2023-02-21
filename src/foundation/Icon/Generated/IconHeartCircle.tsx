import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconHeartCircle12 from './IconHeartCircle12';
import IconHeartCircle16 from './IconHeartCircle16';
import IconHeartCircle20 from './IconHeartCircle20';
import IconHeartCircle24 from './IconHeartCircle24';
import IconHeartCircle32 from './IconHeartCircle32';

const IconHeartCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconHeartCircle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconHeartCircle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconHeartCircle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconHeartCircle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconHeartCircle32 {...props} />}
        </span>
    );
};

const MemoizedIconHeartCircle = memo(IconHeartCircle);
MemoizedIconHeartCircle.displayName = 'FondueIconHeartCircle';

export default MemoizedIconHeartCircle;
