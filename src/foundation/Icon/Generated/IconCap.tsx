import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCap12 from './IconCap12';
import IconCap16 from './IconCap16';
import IconCap20 from './IconCap20';
import IconCap24 from './IconCap24';
import IconCap32 from './IconCap32';

const IconCap = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCap12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCap16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCap20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCap24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCap32 {...props} />}
        </span>
    );
};

const MemoizedIconCap = memo(IconCap);
MemoizedIconCap.displayName = 'FondueIconCap';

export default MemoizedIconCap;
