import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTwitter12 from './IconTwitter12';
import IconTwitter16 from './IconTwitter16';
import IconTwitter20 from './IconTwitter20';
import IconTwitter24 from './IconTwitter24';
import IconTwitter32 from './IconTwitter32';

const IconTwitter = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTwitter12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTwitter16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTwitter20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTwitter24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTwitter32 {...props} />}
        </span>
    );
};
IconTwitter.displayName = 'FondueIconTwitter';

export default memo(IconTwitter);
