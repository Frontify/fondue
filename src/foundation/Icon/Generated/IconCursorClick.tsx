import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCursorClick12 from './IconCursorClick12';
import IconCursorClick16 from './IconCursorClick16';
import IconCursorClick20 from './IconCursorClick20';
import IconCursorClick24 from './IconCursorClick24';
import IconCursorClick32 from './IconCursorClick32';

const IconCursorClick = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCursorClick12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCursorClick16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCursorClick20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCursorClick24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCursorClick32 {...props} />}
        </span>
    );
};

const MemoizedIconCursorClick = memo(IconCursorClick);
MemoizedIconCursorClick.displayName = 'FondueIconCursorClick';

export default MemoizedIconCursorClick;
