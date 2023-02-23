import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPlayBox12 from './IconPlayBox12';
import IconPlayBox16 from './IconPlayBox16';
import IconPlayBox20 from './IconPlayBox20';
import IconPlayBox24 from './IconPlayBox24';
import IconPlayBox32 from './IconPlayBox32';

const IconPlayBox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPlayBox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPlayBox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPlayBox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPlayBox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPlayBox32 {...props} />}
        </span>
    );
};
IconPlayBox.displayName = 'FondueIconPlayBox';

export default memo(IconPlayBox);
