import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowAlignUp12 from './IconArrowAlignUp12';
import IconArrowAlignUp16 from './IconArrowAlignUp16';
import IconArrowAlignUp20 from './IconArrowAlignUp20';
import IconArrowAlignUp24 from './IconArrowAlignUp24';
import IconArrowAlignUp32 from './IconArrowAlignUp32';

const IconArrowAlignUp = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowAlignUp12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowAlignUp16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowAlignUp20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowAlignUp24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowAlignUp32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowAlignUp = memo(IconArrowAlignUp);
MemoizedIconArrowAlignUp.displayName = 'FondueIconArrowAlignUp';

export default MemoizedIconArrowAlignUp;
