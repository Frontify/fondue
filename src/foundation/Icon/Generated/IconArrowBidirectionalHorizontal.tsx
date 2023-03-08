import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowBidirectionalHorizontal12 from './IconArrowBidirectionalHorizontal12';
import IconArrowBidirectionalHorizontal16 from './IconArrowBidirectionalHorizontal16';
import IconArrowBidirectionalHorizontal20 from './IconArrowBidirectionalHorizontal20';
import IconArrowBidirectionalHorizontal24 from './IconArrowBidirectionalHorizontal24';
import IconArrowBidirectionalHorizontal32 from './IconArrowBidirectionalHorizontal32';

const IconArrowBidirectionalHorizontal = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowBidirectionalHorizontal12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowBidirectionalHorizontal16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowBidirectionalHorizontal20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowBidirectionalHorizontal24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowBidirectionalHorizontal32 {...props} />}
        </span>
    );
};
IconArrowBidirectionalHorizontal.displayName = 'FondueIconArrowBidirectionalHorizontal';

export default memo(IconArrowBidirectionalHorizontal);
