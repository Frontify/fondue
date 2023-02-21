import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBar12 from './IconBar12';
import IconBar16 from './IconBar16';
import IconBar20 from './IconBar20';
import IconBar24 from './IconBar24';
import IconBar32 from './IconBar32';

const IconBar = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBar12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBar16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBar20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBar24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBar32 {...props} />}
        </span>
    );
};

const MemoizedIconBar = memo(IconBar);
MemoizedIconBar.displayName = 'FondueIconBar';

export default MemoizedIconBar;
