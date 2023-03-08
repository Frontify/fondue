import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPen12 from './IconPen12';
import IconPen16 from './IconPen16';
import IconPen20 from './IconPen20';
import IconPen24 from './IconPen24';
import IconPen32 from './IconPen32';

const IconPen = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPen12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPen16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPen20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPen24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPen32 {...props} />}
        </span>
    );
};
IconPen.displayName = 'FondueIconPen';

export default memo(IconPen);
