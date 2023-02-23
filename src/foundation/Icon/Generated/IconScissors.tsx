import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconScissors12 from './IconScissors12';
import IconScissors16 from './IconScissors16';
import IconScissors20 from './IconScissors20';
import IconScissors24 from './IconScissors24';
import IconScissors32 from './IconScissors32';

const IconScissors = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconScissors12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconScissors16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconScissors20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconScissors24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconScissors32 {...props} />}
        </span>
    );
};
IconScissors.displayName = 'FondueIconScissors';

export default memo(IconScissors);
