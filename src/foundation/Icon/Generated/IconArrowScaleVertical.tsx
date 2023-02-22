import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowScaleVertical12 from './IconArrowScaleVertical12';
import IconArrowScaleVertical16 from './IconArrowScaleVertical16';
import IconArrowScaleVertical20 from './IconArrowScaleVertical20';
import IconArrowScaleVertical24 from './IconArrowScaleVertical24';
import IconArrowScaleVertical32 from './IconArrowScaleVertical32';

const IconArrowScaleVertical = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowScaleVertical12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowScaleVertical16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowScaleVertical20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowScaleVertical24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowScaleVertical32 {...props} />}
        </span>
    );
};
IconArrowScaleVertical.displayName = 'FondueIconArrowScaleVertical';

export default memo(IconArrowScaleVertical);
