import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowMinimize12 from './IconArrowMinimize12';
import IconArrowMinimize16 from './IconArrowMinimize16';
import IconArrowMinimize20 from './IconArrowMinimize20';
import IconArrowMinimize24 from './IconArrowMinimize24';
import IconArrowMinimize32 from './IconArrowMinimize32';

const IconArrowMinimize = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowMinimize12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowMinimize16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowMinimize20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowMinimize24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowMinimize32 {...props} />}
        </span>
    );
};
IconArrowMinimize.displayName = 'FondueIconArrowMinimize';

export default memo(IconArrowMinimize);
