import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMasonry12 from './IconMasonry12';
import IconMasonry16 from './IconMasonry16';
import IconMasonry20 from './IconMasonry20';
import IconMasonry24 from './IconMasonry24';
import IconMasonry32 from './IconMasonry32';

const IconMasonry = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMasonry12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMasonry16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMasonry20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMasonry24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMasonry32 {...props} />}
        </span>
    );
};
IconMasonry.displayName = 'FondueIconMasonry';

export default memo(IconMasonry);
