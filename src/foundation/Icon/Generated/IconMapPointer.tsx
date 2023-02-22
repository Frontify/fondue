import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMapPointer12 from './IconMapPointer12';
import IconMapPointer16 from './IconMapPointer16';
import IconMapPointer20 from './IconMapPointer20';
import IconMapPointer24 from './IconMapPointer24';
import IconMapPointer32 from './IconMapPointer32';

const IconMapPointer = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMapPointer12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMapPointer16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMapPointer20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMapPointer24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMapPointer32 {...props} />}
        </span>
    );
};
IconMapPointer.displayName = 'FondueIconMapPointer';

export default memo(IconMapPointer);
