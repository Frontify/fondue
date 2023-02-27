import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconHeading12 from './IconHeading12';
import IconHeading16 from './IconHeading16';
import IconHeading20 from './IconHeading20';
import IconHeading24 from './IconHeading24';
import IconHeading32 from './IconHeading32';

const IconHeading = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconHeading12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconHeading16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconHeading20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconHeading24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconHeading32 {...props} />}
        </span>
    );
};
IconHeading.displayName = 'FondueIconHeading';

export default memo(IconHeading);
