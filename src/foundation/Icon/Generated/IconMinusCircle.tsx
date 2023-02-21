import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMinusCircle12 from './IconMinusCircle12';
import IconMinusCircle16 from './IconMinusCircle16';
import IconMinusCircle20 from './IconMinusCircle20';
import IconMinusCircle24 from './IconMinusCircle24';
import IconMinusCircle32 from './IconMinusCircle32';

const IconMinusCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMinusCircle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMinusCircle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMinusCircle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMinusCircle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMinusCircle32 {...props} />}
        </span>
    );
};

const MemoizedIconMinusCircle = memo(IconMinusCircle);
MemoizedIconMinusCircle.displayName = 'FondueIconMinusCircle';

export default MemoizedIconMinusCircle;
