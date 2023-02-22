import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextOutdent12 from './IconTextOutdent12';
import IconTextOutdent16 from './IconTextOutdent16';
import IconTextOutdent20 from './IconTextOutdent20';
import IconTextOutdent24 from './IconTextOutdent24';
import IconTextOutdent32 from './IconTextOutdent32';

const IconTextOutdent = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextOutdent12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextOutdent16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextOutdent20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextOutdent24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextOutdent32 {...props} />}
        </span>
    );
};
IconTextOutdent.displayName = 'FondueIconTextOutdent';

export default memo(IconTextOutdent);
