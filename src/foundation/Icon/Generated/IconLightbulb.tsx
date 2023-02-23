import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLightbulb12 from './IconLightbulb12';
import IconLightbulb16 from './IconLightbulb16';
import IconLightbulb20 from './IconLightbulb20';
import IconLightbulb24 from './IconLightbulb24';
import IconLightbulb32 from './IconLightbulb32';

const IconLightbulb = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLightbulb12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLightbulb16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLightbulb20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLightbulb24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLightbulb32 {...props} />}
        </span>
    );
};
IconLightbulb.displayName = 'FondueIconLightbulb';

export default memo(IconLightbulb);
