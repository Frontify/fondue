import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFunnel12 from './IconFunnel12';
import IconFunnel16 from './IconFunnel16';
import IconFunnel20 from './IconFunnel20';
import IconFunnel24 from './IconFunnel24';
import IconFunnel32 from './IconFunnel32';

const IconFunnel = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFunnel12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconFunnel16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconFunnel20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconFunnel24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconFunnel32 {...props} />}
        </span>
    );
};
IconFunnel.displayName = 'FondueIconFunnel';

export default memo(IconFunnel);
