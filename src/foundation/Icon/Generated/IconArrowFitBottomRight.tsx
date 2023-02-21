import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowFitBottomRight12 from './IconArrowFitBottomRight12';
import IconArrowFitBottomRight16 from './IconArrowFitBottomRight16';
import IconArrowFitBottomRight20 from './IconArrowFitBottomRight20';
import IconArrowFitBottomRight24 from './IconArrowFitBottomRight24';
import IconArrowFitBottomRight32 from './IconArrowFitBottomRight32';

const IconArrowFitBottomRight = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowFitBottomRight12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowFitBottomRight16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowFitBottomRight20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowFitBottomRight24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowFitBottomRight32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowFitBottomRight = memo(IconArrowFitBottomRight);
MemoizedIconArrowFitBottomRight.displayName = 'FondueIconArrowFitBottomRight';

export default MemoizedIconArrowFitBottomRight;
