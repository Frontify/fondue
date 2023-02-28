import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMegaphone12 from './IconMegaphone12';
import IconMegaphone16 from './IconMegaphone16';
import IconMegaphone20 from './IconMegaphone20';
import IconMegaphone24 from './IconMegaphone24';
import IconMegaphone32 from './IconMegaphone32';

const IconMegaphone = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMegaphone12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMegaphone16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMegaphone20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMegaphone24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMegaphone32 {...props} />}
        </span>
    );
};
IconMegaphone.displayName = 'FondueIconMegaphone';

export default memo(IconMegaphone);
