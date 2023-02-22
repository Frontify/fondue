import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMarkArea12 from './IconMarkArea12';
import IconMarkArea16 from './IconMarkArea16';
import IconMarkArea20 from './IconMarkArea20';
import IconMarkArea24 from './IconMarkArea24';
import IconMarkArea32 from './IconMarkArea32';

const IconMarkArea = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMarkArea12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMarkArea16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMarkArea20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMarkArea24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMarkArea32 {...props} />}
        </span>
    );
};
IconMarkArea.displayName = 'FondueIconMarkArea';

export default memo(IconMarkArea);
