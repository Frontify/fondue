import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowStretchBox12 from './IconArrowStretchBox12';
import IconArrowStretchBox16 from './IconArrowStretchBox16';
import IconArrowStretchBox20 from './IconArrowStretchBox20';
import IconArrowStretchBox24 from './IconArrowStretchBox24';
import IconArrowStretchBox32 from './IconArrowStretchBox32';

const IconArrowStretchBox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowStretchBox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowStretchBox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowStretchBox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowStretchBox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowStretchBox32 {...props} />}
        </span>
    );
};
IconArrowStretchBox.displayName = 'FondueIconArrowStretchBox';

export default memo(IconArrowStretchBox);
