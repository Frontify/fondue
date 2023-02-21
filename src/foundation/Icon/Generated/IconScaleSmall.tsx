import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconScaleSmall12 from './IconScaleSmall12';
import IconScaleSmall16 from './IconScaleSmall16';
import IconScaleSmall20 from './IconScaleSmall20';
import IconScaleSmall24 from './IconScaleSmall24';
import IconScaleSmall32 from './IconScaleSmall32';

const IconScaleSmall = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconScaleSmall12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconScaleSmall16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconScaleSmall20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconScaleSmall24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconScaleSmall32 {...props} />}
        </span>
    );
};

const MemoizedIconScaleSmall = memo(IconScaleSmall);
MemoizedIconScaleSmall.displayName = 'FondueIconScaleSmall';

export default MemoizedIconScaleSmall;
