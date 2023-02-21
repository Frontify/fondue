import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowAlignRight12 from './IconArrowAlignRight12';
import IconArrowAlignRight16 from './IconArrowAlignRight16';
import IconArrowAlignRight20 from './IconArrowAlignRight20';
import IconArrowAlignRight24 from './IconArrowAlignRight24';
import IconArrowAlignRight32 from './IconArrowAlignRight32';

const IconArrowAlignRight = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowAlignRight12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowAlignRight16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowAlignRight20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowAlignRight24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowAlignRight32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowAlignRight = memo(IconArrowAlignRight);
MemoizedIconArrowAlignRight.displayName = 'FondueIconArrowAlignRight';

export default MemoizedIconArrowAlignRight;
