import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconClock12 from './IconClock12';
import IconClock16 from './IconClock16';
import IconClock20 from './IconClock20';
import IconClock24 from './IconClock24';
import IconClock32 from './IconClock32';

const IconClock = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconClock12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconClock16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconClock20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconClock24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconClock32 {...props} />}
        </span>
    );
};

const MemoizedIconClock = memo(IconClock);
MemoizedIconClock.displayName = 'FondueIconClock';

export default MemoizedIconClock;
