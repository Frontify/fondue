import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSubscript12 from './IconSubscript12';
import IconSubscript16 from './IconSubscript16';
import IconSubscript20 from './IconSubscript20';
import IconSubscript24 from './IconSubscript24';
import IconSubscript32 from './IconSubscript32';

const IconSubscript = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSubscript12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSubscript16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSubscript20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSubscript24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSubscript32 {...props} />}
        </span>
    );
};
IconSubscript.displayName = 'FondueIconSubscript';

export default memo(IconSubscript);
