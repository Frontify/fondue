import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconClockAlternative12 from './IconClockAlternative12';
import IconClockAlternative16 from './IconClockAlternative16';
import IconClockAlternative20 from './IconClockAlternative20';
import IconClockAlternative24 from './IconClockAlternative24';
import IconClockAlternative32 from './IconClockAlternative32';

const IconClockAlternative = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconClockAlternative12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconClockAlternative16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconClockAlternative20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconClockAlternative24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconClockAlternative32 {...props} />}
        </span>
    );
};
IconClockAlternative.displayName = 'FondueIconClockAlternative';

export default memo(IconClockAlternative);
