import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowAlignVerticalCentre12 from './IconArrowAlignVerticalCentre12';
import IconArrowAlignVerticalCentre16 from './IconArrowAlignVerticalCentre16';
import IconArrowAlignVerticalCentre20 from './IconArrowAlignVerticalCentre20';
import IconArrowAlignVerticalCentre24 from './IconArrowAlignVerticalCentre24';
import IconArrowAlignVerticalCentre32 from './IconArrowAlignVerticalCentre32';

const IconArrowAlignVerticalCentre = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowAlignVerticalCentre12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowAlignVerticalCentre16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowAlignVerticalCentre20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowAlignVerticalCentre24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowAlignVerticalCentre32 {...props} />}
        </span>
    );
};
IconArrowAlignVerticalCentre.displayName = 'FondueIconArrowAlignVerticalCentre';

export default memo(IconArrowAlignVerticalCentre);
