import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowRight12 from './IconArrowRight12';
import IconArrowRight16 from './IconArrowRight16';
import IconArrowRight20 from './IconArrowRight20';
import IconArrowRight24 from './IconArrowRight24';
import IconArrowRight32 from './IconArrowRight32';

const IconArrowRight = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowRight12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowRight16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowRight20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowRight24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowRight32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowRight = memo(IconArrowRight);
MemoizedIconArrowRight.displayName = 'FondueIconArrowRight';

export default MemoizedIconArrowRight;
