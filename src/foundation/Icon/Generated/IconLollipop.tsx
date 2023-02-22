import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLollipop12 from './IconLollipop12';
import IconLollipop16 from './IconLollipop16';
import IconLollipop20 from './IconLollipop20';
import IconLollipop24 from './IconLollipop24';
import IconLollipop32 from './IconLollipop32';

const IconLollipop = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLollipop12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLollipop16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLollipop20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLollipop24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLollipop32 {...props} />}
        </span>
    );
};
IconLollipop.displayName = 'FondueIconLollipop';

export default memo(IconLollipop);
