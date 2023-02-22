import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCardLayoutSmall12 from './IconCardLayoutSmall12';
import IconCardLayoutSmall16 from './IconCardLayoutSmall16';
import IconCardLayoutSmall20 from './IconCardLayoutSmall20';
import IconCardLayoutSmall24 from './IconCardLayoutSmall24';
import IconCardLayoutSmall32 from './IconCardLayoutSmall32';

const IconCardLayoutSmall = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCardLayoutSmall12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCardLayoutSmall16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCardLayoutSmall20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCardLayoutSmall24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCardLayoutSmall32 {...props} />}
        </span>
    );
};
IconCardLayoutSmall.displayName = 'FondueIconCardLayoutSmall';

export default memo(IconCardLayoutSmall);
