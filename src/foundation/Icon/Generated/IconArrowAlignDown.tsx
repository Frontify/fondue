import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowAlignDown12 from './IconArrowAlignDown12';
import IconArrowAlignDown16 from './IconArrowAlignDown16';
import IconArrowAlignDown20 from './IconArrowAlignDown20';
import IconArrowAlignDown24 from './IconArrowAlignDown24';
import IconArrowAlignDown32 from './IconArrowAlignDown32';

const IconArrowAlignDown = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowAlignDown12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowAlignDown16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowAlignDown20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowAlignDown24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowAlignDown32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowAlignDown = memo(IconArrowAlignDown);
MemoizedIconArrowAlignDown.displayName = 'FondueIconArrowAlignDown';

export default MemoizedIconArrowAlignDown;
