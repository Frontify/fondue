import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconInfo12 from './IconInfo12';
import IconInfo16 from './IconInfo16';
import IconInfo20 from './IconInfo20';
import IconInfo24 from './IconInfo24';
import IconInfo32 from './IconInfo32';

const IconInfo = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconInfo12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconInfo16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconInfo20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconInfo24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconInfo32 {...props} />}
        </span>
    );
};
IconInfo.displayName = 'FondueIconInfo';

export default memo(IconInfo);
