import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSuperscript12 from './IconSuperscript12';
import IconSuperscript16 from './IconSuperscript16';
import IconSuperscript20 from './IconSuperscript20';
import IconSuperscript24 from './IconSuperscript24';
import IconSuperscript32 from './IconSuperscript32';

const IconSuperscript = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSuperscript12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSuperscript16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSuperscript20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSuperscript24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSuperscript32 {...props} />}
        </span>
    );
};
IconSuperscript.displayName = 'FondueIconSuperscript';

export default memo(IconSuperscript);
