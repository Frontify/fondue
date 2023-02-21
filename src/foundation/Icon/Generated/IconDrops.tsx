import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDrops12 from './IconDrops12';
import IconDrops16 from './IconDrops16';
import IconDrops20 from './IconDrops20';
import IconDrops24 from './IconDrops24';
import IconDrops32 from './IconDrops32';

const IconDrops = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDrops12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDrops16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDrops20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDrops24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDrops32 {...props} />}
        </span>
    );
};

const MemoizedIconDrops = memo(IconDrops);
MemoizedIconDrops.displayName = 'FondueIconDrops';

export default MemoizedIconDrops;
