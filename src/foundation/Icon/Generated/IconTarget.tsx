import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTarget12 from './IconTarget12';
import IconTarget16 from './IconTarget16';
import IconTarget20 from './IconTarget20';
import IconTarget24 from './IconTarget24';
import IconTarget32 from './IconTarget32';

const IconTarget = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTarget12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTarget16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTarget20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTarget24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTarget32 {...props} />}
        </span>
    );
};
IconTarget.displayName = 'FondueIconTarget';

export default memo(IconTarget);
