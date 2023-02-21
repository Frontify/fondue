import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCheckMarkCircle12Filled from './IconCheckMarkCircle12Filled';
import IconCheckMarkCircle12 from './IconCheckMarkCircle12';
import IconCheckMarkCircle16Filled from './IconCheckMarkCircle16Filled';
import IconCheckMarkCircle16 from './IconCheckMarkCircle16';
import IconCheckMarkCircle20Filled from './IconCheckMarkCircle20Filled';
import IconCheckMarkCircle20 from './IconCheckMarkCircle20';
import IconCheckMarkCircle24Filled from './IconCheckMarkCircle24Filled';
import IconCheckMarkCircle24 from './IconCheckMarkCircle24';
import IconCheckMarkCircle32Filled from './IconCheckMarkCircle32Filled';
import IconCheckMarkCircle32 from './IconCheckMarkCircle32';

const IconCheckMarkCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconCheckMarkCircle12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconCheckMarkCircle12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconCheckMarkCircle16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCheckMarkCircle16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconCheckMarkCircle20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCheckMarkCircle20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconCheckMarkCircle24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCheckMarkCircle24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconCheckMarkCircle32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCheckMarkCircle32 {...props} />}
        </span>
    );
};

const MemoizedIconCheckMarkCircle = memo(IconCheckMarkCircle);
MemoizedIconCheckMarkCircle.displayName = 'FondueIconCheckMarkCircle';

export default MemoizedIconCheckMarkCircle;
