import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBell12 from './IconBell12';
import IconBell16 from './IconBell16';
import IconBell20 from './IconBell20';
import IconBell24 from './IconBell24';
import IconBell32 from './IconBell32';

const IconBell = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBell12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBell16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBell20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBell24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBell32 {...props} />}
        </span>
    );
};

const MemoizedIconBell = memo(IconBell);
MemoizedIconBell.displayName = 'FondueIconBell';

export default MemoizedIconBell;
