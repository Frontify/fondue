import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowBidirectional12 from './IconArrowBidirectional12';
import IconArrowBidirectional16 from './IconArrowBidirectional16';
import IconArrowBidirectional20 from './IconArrowBidirectional20';
import IconArrowBidirectional24 from './IconArrowBidirectional24';
import IconArrowBidirectional32 from './IconArrowBidirectional32';

const IconArrowBidirectional = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowBidirectional12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowBidirectional16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowBidirectional20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowBidirectional24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowBidirectional32 {...props} />}
        </span>
    );
};
IconArrowBidirectional.displayName = 'FondueIconArrowBidirectional';

export default memo(IconArrowBidirectional);
