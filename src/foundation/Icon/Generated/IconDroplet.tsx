import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDroplet12 from './IconDroplet12';
import IconDroplet16 from './IconDroplet16';
import IconDroplet20 from './IconDroplet20';
import IconDroplet24 from './IconDroplet24';
import IconDroplet32 from './IconDroplet32';

const IconDroplet = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDroplet12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDroplet16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDroplet20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDroplet24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDroplet32 {...props} />}
        </span>
    );
};
IconDroplet.displayName = 'FondueIconDroplet';

export default memo(IconDroplet);
