import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTypography12 from './IconTypography12';
import IconTypography16 from './IconTypography16';
import IconTypography20 from './IconTypography20';
import IconTypography24 from './IconTypography24';
import IconTypography32 from './IconTypography32';

const IconTypography = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTypography12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTypography16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTypography20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTypography24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTypography32 {...props} />}
        </span>
    );
};
IconTypography.displayName = 'FondueIconTypography';

export default memo(IconTypography);
