import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowCircleUp12 from './IconArrowCircleUp12';
import IconArrowCircleUp16 from './IconArrowCircleUp16';
import IconArrowCircleUp20 from './IconArrowCircleUp20';
import IconArrowCircleUp24 from './IconArrowCircleUp24';
import IconArrowCircleUp32 from './IconArrowCircleUp32';

const IconArrowCircleUp = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowCircleUp12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowCircleUp16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowCircleUp20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowCircleUp24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowCircleUp32 {...props} />}
        </span>
    );
};
IconArrowCircleUp.displayName = 'FondueIconArrowCircleUp';

export default memo(IconArrowCircleUp);
