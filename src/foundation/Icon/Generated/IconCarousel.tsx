import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCarousel12 from './IconCarousel12';
import IconCarousel16 from './IconCarousel16';
import IconCarousel20 from './IconCarousel20';
import IconCarousel24 from './IconCarousel24';
import IconCarousel32 from './IconCarousel32';

const IconCarousel = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCarousel12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCarousel16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCarousel20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCarousel24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCarousel32 {...props} />}
        </span>
    );
};

const MemoizedIconCarousel = memo(IconCarousel);
MemoizedIconCarousel.displayName = 'FondueIconCarousel';

export default MemoizedIconCarousel;
