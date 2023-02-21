import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMagnifier12 from './IconMagnifier12';
import IconMagnifier16 from './IconMagnifier16';
import IconMagnifier20 from './IconMagnifier20';
import IconMagnifier24 from './IconMagnifier24';
import IconMagnifier32 from './IconMagnifier32';

const IconMagnifier = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMagnifier12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMagnifier16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMagnifier20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMagnifier24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMagnifier32 {...props} />}
        </span>
    );
};

const MemoizedIconMagnifier = memo(IconMagnifier);
MemoizedIconMagnifier.displayName = 'FondueIconMagnifier';

export default MemoizedIconMagnifier;
