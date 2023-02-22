import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTypographyCase12 from './IconTypographyCase12';
import IconTypographyCase16 from './IconTypographyCase16';
import IconTypographyCase20 from './IconTypographyCase20';
import IconTypographyCase24 from './IconTypographyCase24';
import IconTypographyCase32 from './IconTypographyCase32';

const IconTypographyCase = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTypographyCase12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTypographyCase16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTypographyCase20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTypographyCase24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTypographyCase32 {...props} />}
        </span>
    );
};
IconTypographyCase.displayName = 'FondueIconTypographyCase';

export default memo(IconTypographyCase);
