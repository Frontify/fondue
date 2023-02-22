import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconEyeOff12 from './IconEyeOff12';
import IconEyeOff16 from './IconEyeOff16';
import IconEyeOff20 from './IconEyeOff20';
import IconEyeOff24 from './IconEyeOff24';
import IconEyeOff32 from './IconEyeOff32';

const IconEyeOff = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconEyeOff12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconEyeOff16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconEyeOff20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconEyeOff24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconEyeOff32 {...props} />}
        </span>
    );
};
IconEyeOff.displayName = 'FondueIconEyeOff';

export default memo(IconEyeOff);
