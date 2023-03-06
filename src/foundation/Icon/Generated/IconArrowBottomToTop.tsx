import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowBottomToTop12 from './IconArrowBottomToTop12';
import IconArrowBottomToTop16 from './IconArrowBottomToTop16';
import IconArrowBottomToTop20 from './IconArrowBottomToTop20';
import IconArrowBottomToTop24 from './IconArrowBottomToTop24';
import IconArrowBottomToTop32 from './IconArrowBottomToTop32';

const IconArrowBottomToTop = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowBottomToTop12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowBottomToTop16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowBottomToTop20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowBottomToTop24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowBottomToTop32 {...props} />}
        </span>
    );
};
IconArrowBottomToTop.displayName = 'FondueIconArrowBottomToTop';

export default memo(IconArrowBottomToTop);
