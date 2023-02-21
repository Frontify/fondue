import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCrossCircle12Filled from './IconCrossCircle12Filled';
import IconCrossCircle12 from './IconCrossCircle12';
import IconCrossCircle16Filled from './IconCrossCircle16Filled';
import IconCrossCircle16 from './IconCrossCircle16';
import IconCrossCircle20Filled from './IconCrossCircle20Filled';
import IconCrossCircle20 from './IconCrossCircle20';
import IconCrossCircle24Filled from './IconCrossCircle24Filled';
import IconCrossCircle24 from './IconCrossCircle24';
import IconCrossCircle32Filled from './IconCrossCircle32Filled';
import IconCrossCircle32 from './IconCrossCircle32';

const IconCrossCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconCrossCircle12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconCrossCircle12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconCrossCircle16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCrossCircle16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconCrossCircle20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCrossCircle20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconCrossCircle24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCrossCircle24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconCrossCircle32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCrossCircle32 {...props} />}
        </span>
    );
};

const MemoizedIconCrossCircle = memo(IconCrossCircle);
MemoizedIconCrossCircle.displayName = 'FondueIconCrossCircle';

export default MemoizedIconCrossCircle;
