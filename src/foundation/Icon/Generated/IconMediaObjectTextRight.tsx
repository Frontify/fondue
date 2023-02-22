import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectTextRight12 from './IconMediaObjectTextRight12';
import IconMediaObjectTextRight16 from './IconMediaObjectTextRight16';
import IconMediaObjectTextRight20 from './IconMediaObjectTextRight20';
import IconMediaObjectTextRight24 from './IconMediaObjectTextRight24';
import IconMediaObjectTextRight32 from './IconMediaObjectTextRight32';

const IconMediaObjectTextRight = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectTextRight12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectTextRight16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectTextRight20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectTextRight24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectTextRight32 {...props} />}
        </span>
    );
};
IconMediaObjectTextRight.displayName = 'FondueIconMediaObjectTextRight';

export default memo(IconMediaObjectTextRight);
