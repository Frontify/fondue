import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCrossCircleBox12 from './IconCrossCircleBox12';
import IconCrossCircleBox16 from './IconCrossCircleBox16';
import IconCrossCircleBox20 from './IconCrossCircleBox20';
import IconCrossCircleBox24 from './IconCrossCircleBox24';
import IconCrossCircleBox32 from './IconCrossCircleBox32';

const IconCrossCircleBox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCrossCircleBox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCrossCircleBox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCrossCircleBox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCrossCircleBox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCrossCircleBox32 {...props} />}
        </span>
    );
};
IconCrossCircleBox.displayName = 'FondueIconCrossCircleBox';

export default memo(IconCrossCircleBox);
