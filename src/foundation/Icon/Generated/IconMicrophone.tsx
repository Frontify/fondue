import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMicrophone12 from './IconMicrophone12';
import IconMicrophone16 from './IconMicrophone16';
import IconMicrophone20 from './IconMicrophone20';
import IconMicrophone24 from './IconMicrophone24';
import IconMicrophone32 from './IconMicrophone32';

const IconMicrophone = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMicrophone12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMicrophone16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMicrophone20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMicrophone24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMicrophone32 {...props} />}
        </span>
    );
};
IconMicrophone.displayName = 'FondueIconMicrophone';

export default memo(IconMicrophone);
