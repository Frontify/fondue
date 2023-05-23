import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLabel12 from './IconLabel12';
import IconLabel16 from './IconLabel16';
import IconLabel20 from './IconLabel20';
import IconLabel24 from './IconLabel24';
import IconLabel32 from './IconLabel32';

const IconLabel = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLabel12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLabel16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLabel20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLabel24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLabel32 {...props} />}
        </span>
    );
};
IconLabel.displayName = 'FondueIconLabel';

export default memo(IconLabel);
