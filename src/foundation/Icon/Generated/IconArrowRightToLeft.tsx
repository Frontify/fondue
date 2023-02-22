import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowRightToLeft12 from './IconArrowRightToLeft12';
import IconArrowRightToLeft16 from './IconArrowRightToLeft16';
import IconArrowRightToLeft20 from './IconArrowRightToLeft20';
import IconArrowRightToLeft24 from './IconArrowRightToLeft24';
import IconArrowRightToLeft32 from './IconArrowRightToLeft32';

const IconArrowRightToLeft = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowRightToLeft12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowRightToLeft16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowRightToLeft20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowRightToLeft24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowRightToLeft32 {...props} />}
        </span>
    );
};
IconArrowRightToLeft.displayName = 'FondueIconArrowRightToLeft';

export default memo(IconArrowRightToLeft);
