import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconImageStack12 from './IconImageStack12';
import IconImageStack16 from './IconImageStack16';
import IconImageStack20 from './IconImageStack20';
import IconImageStack24 from './IconImageStack24';
import IconImageStack32 from './IconImageStack32';

const IconImageStack = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconImageStack12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconImageStack16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconImageStack20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconImageStack24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconImageStack32 {...props} />}
        </span>
    );
};

const MemoizedIconImageStack = memo(IconImageStack);
MemoizedIconImageStack.displayName = 'FondueIconImageStack';

export default MemoizedIconImageStack;
