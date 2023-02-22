import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPlus12 from './IconPlus12';
import IconPlus16 from './IconPlus16';
import IconPlus20 from './IconPlus20';
import IconPlus24 from './IconPlus24';
import IconPlus32 from './IconPlus32';

const IconPlus = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPlus12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPlus16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPlus20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPlus24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPlus32 {...props} />}
        </span>
    );
};
IconPlus.displayName = 'FondueIconPlus';

export default memo(IconPlus);
