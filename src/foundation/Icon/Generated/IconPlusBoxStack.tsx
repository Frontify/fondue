import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPlusBoxStack12 from './IconPlusBoxStack12';
import IconPlusBoxStack16 from './IconPlusBoxStack16';
import IconPlusBoxStack20 from './IconPlusBoxStack20';
import IconPlusBoxStack24 from './IconPlusBoxStack24';
import IconPlusBoxStack32 from './IconPlusBoxStack32';

const IconPlusBoxStack = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPlusBoxStack12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPlusBoxStack16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPlusBoxStack20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPlusBoxStack24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPlusBoxStack32 {...props} />}
        </span>
    );
};
IconPlusBoxStack.displayName = 'FondueIconPlusBoxStack';

export default memo(IconPlusBoxStack);
