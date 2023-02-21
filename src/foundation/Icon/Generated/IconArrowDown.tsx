import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowDown12 from './IconArrowDown12';
import IconArrowDown16 from './IconArrowDown16';
import IconArrowDown20 from './IconArrowDown20';
import IconArrowDown24 from './IconArrowDown24';
import IconArrowDown32 from './IconArrowDown32';

const IconArrowDown = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowDown12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowDown16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowDown20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowDown24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowDown32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowDown = memo(IconArrowDown);
MemoizedIconArrowDown.displayName = 'FondueIconArrowDown';

export default MemoizedIconArrowDown;
