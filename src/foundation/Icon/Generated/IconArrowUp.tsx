import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowUp12 from './IconArrowUp12';
import IconArrowUp16 from './IconArrowUp16';
import IconArrowUp20 from './IconArrowUp20';
import IconArrowUp24 from './IconArrowUp24';
import IconArrowUp32 from './IconArrowUp32';

const IconArrowUp = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowUp12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowUp16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowUp20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowUp24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowUp32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowUp = memo(IconArrowUp);
MemoizedIconArrowUp.displayName = 'FondueIconArrowUp';

export default MemoizedIconArrowUp;
