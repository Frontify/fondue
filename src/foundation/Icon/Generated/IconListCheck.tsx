import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconListCheck12 from './IconListCheck12';
import IconListCheck16 from './IconListCheck16';
import IconListCheck20 from './IconListCheck20';
import IconListCheck24 from './IconListCheck24';
import IconListCheck32 from './IconListCheck32';

const IconListCheck = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconListCheck12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconListCheck16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconListCheck20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconListCheck24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconListCheck32 {...props} />}
        </span>
    );
};
IconListCheck.displayName = 'FondueIconListCheck';

export default memo(IconListCheck);
