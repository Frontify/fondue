import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPointout12 from './IconPointout12';
import IconPointout16 from './IconPointout16';
import IconPointout20 from './IconPointout20';
import IconPointout24 from './IconPointout24';
import IconPointout32 from './IconPointout32';

const IconPointout = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPointout12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPointout16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPointout20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPointout24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPointout32 {...props} />}
        </span>
    );
};
IconPointout.displayName = 'FondueIconPointout';

export default memo(IconPointout);
