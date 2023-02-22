import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowLeft12 from './IconArrowLeft12';
import IconArrowLeft16 from './IconArrowLeft16';
import IconArrowLeft20 from './IconArrowLeft20';
import IconArrowLeft24 from './IconArrowLeft24';
import IconArrowLeft32 from './IconArrowLeft32';

const IconArrowLeft = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowLeft12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowLeft16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowLeft20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowLeft24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowLeft32 {...props} />}
        </span>
    );
};
IconArrowLeft.displayName = 'FondueIconArrowLeft';

export default memo(IconArrowLeft);
