import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconOrientationBoxes12 from './IconOrientationBoxes12';
import IconOrientationBoxes16 from './IconOrientationBoxes16';
import IconOrientationBoxes20 from './IconOrientationBoxes20';
import IconOrientationBoxes24 from './IconOrientationBoxes24';
import IconOrientationBoxes32 from './IconOrientationBoxes32';

const IconOrientationBoxes = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconOrientationBoxes12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconOrientationBoxes16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconOrientationBoxes20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconOrientationBoxes24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconOrientationBoxes32 {...props} />}
        </span>
    );
};
IconOrientationBoxes.displayName = 'FondueIconOrientationBoxes';

export default memo(IconOrientationBoxes);
