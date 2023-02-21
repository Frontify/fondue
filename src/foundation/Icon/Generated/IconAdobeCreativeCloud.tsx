import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconAdobeCreativeCloud12 from './IconAdobeCreativeCloud12';
import IconAdobeCreativeCloud16 from './IconAdobeCreativeCloud16';
import IconAdobeCreativeCloud20 from './IconAdobeCreativeCloud20';
import IconAdobeCreativeCloud24 from './IconAdobeCreativeCloud24';
import IconAdobeCreativeCloud32 from './IconAdobeCreativeCloud32';

const IconAdobeCreativeCloud = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconAdobeCreativeCloud12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconAdobeCreativeCloud16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconAdobeCreativeCloud20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconAdobeCreativeCloud24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconAdobeCreativeCloud32 {...props} />}
        </span>
    );
};

const MemoizedIconAdobeCreativeCloud = memo(IconAdobeCreativeCloud);
MemoizedIconAdobeCreativeCloud.displayName = 'FondueIconAdobeCreativeCloud';

export default MemoizedIconAdobeCreativeCloud;
