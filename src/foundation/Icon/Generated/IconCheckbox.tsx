import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCheckbox12 from './IconCheckbox12';
import IconCheckbox16 from './IconCheckbox16';
import IconCheckbox20 from './IconCheckbox20';
import IconCheckbox24 from './IconCheckbox24';
import IconCheckbox32 from './IconCheckbox32';

const IconCheckbox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCheckbox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCheckbox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCheckbox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCheckbox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCheckbox32 {...props} />}
        </span>
    );
};
IconCheckbox.displayName = 'FondueIconCheckbox';

export default memo(IconCheckbox);
