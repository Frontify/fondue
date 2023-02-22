import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowFitBottomLeft12 from './IconArrowFitBottomLeft12';
import IconArrowFitBottomLeft16 from './IconArrowFitBottomLeft16';
import IconArrowFitBottomLeft20 from './IconArrowFitBottomLeft20';
import IconArrowFitBottomLeft24 from './IconArrowFitBottomLeft24';
import IconArrowFitBottomLeft32 from './IconArrowFitBottomLeft32';

const IconArrowFitBottomLeft = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowFitBottomLeft12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowFitBottomLeft16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowFitBottomLeft20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowFitBottomLeft24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowFitBottomLeft32 {...props} />}
        </span>
    );
};
IconArrowFitBottomLeft.displayName = 'FondueIconArrowFitBottomLeft';

export default memo(IconArrowFitBottomLeft);
