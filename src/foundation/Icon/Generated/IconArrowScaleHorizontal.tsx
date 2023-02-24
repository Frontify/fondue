import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowScaleHorizontal12 from './IconArrowScaleHorizontal12';
import IconArrowScaleHorizontal16 from './IconArrowScaleHorizontal16';
import IconArrowScaleHorizontal20 from './IconArrowScaleHorizontal20';
import IconArrowScaleHorizontal24 from './IconArrowScaleHorizontal24';
import IconArrowScaleHorizontal32 from './IconArrowScaleHorizontal32';

const IconArrowScaleHorizontal = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowScaleHorizontal12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowScaleHorizontal16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowScaleHorizontal20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowScaleHorizontal24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowScaleHorizontal32 {...props} />}
        </span>
    );
};
IconArrowScaleHorizontal.displayName = 'FondueIconArrowScaleHorizontal';

export default memo(IconArrowScaleHorizontal);
