import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDividerBlank12 from './IconDividerBlank12';
import IconDividerBlank16 from './IconDividerBlank16';
import IconDividerBlank20 from './IconDividerBlank20';
import IconDividerBlank24 from './IconDividerBlank24';
import IconDividerBlank32 from './IconDividerBlank32';

const IconDividerBlank = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDividerBlank12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDividerBlank16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDividerBlank20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDividerBlank24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDividerBlank32 {...props} />}
        </span>
    );
};

const MemoizedIconDividerBlank = memo(IconDividerBlank);
MemoizedIconDividerBlank.displayName = 'FondueIconDividerBlank';

export default MemoizedIconDividerBlank;
