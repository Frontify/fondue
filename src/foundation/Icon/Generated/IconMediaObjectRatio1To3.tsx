import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectRatio1To312 from './IconMediaObjectRatio1To312';
import IconMediaObjectRatio1To316 from './IconMediaObjectRatio1To316';
import IconMediaObjectRatio1To320 from './IconMediaObjectRatio1To320';
import IconMediaObjectRatio1To324 from './IconMediaObjectRatio1To324';
import IconMediaObjectRatio1To332 from './IconMediaObjectRatio1To332';

const IconMediaObjectRatio1To3 = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectRatio1To312 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectRatio1To316 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectRatio1To320 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectRatio1To324 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectRatio1To332 {...props} />}
        </span>
    );
};
IconMediaObjectRatio1To3.displayName = 'FondueIconMediaObjectRatio1To3';

export default memo(IconMediaObjectRatio1To3);
