import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowOutLogout12 from './IconArrowOutLogout12';
import IconArrowOutLogout16 from './IconArrowOutLogout16';
import IconArrowOutLogout20 from './IconArrowOutLogout20';
import IconArrowOutLogout24 from './IconArrowOutLogout24';
import IconArrowOutLogout32 from './IconArrowOutLogout32';

const IconArrowOutLogout = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowOutLogout12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowOutLogout16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowOutLogout20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowOutLogout24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowOutLogout32 {...props} />}
        </span>
    );
};
IconArrowOutLogout.displayName = 'FondueIconArrowOutLogout';

export default memo(IconArrowOutLogout);
