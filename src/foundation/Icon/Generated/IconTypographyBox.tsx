import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTypographyBox12 from './IconTypographyBox12';
import IconTypographyBox16 from './IconTypographyBox16';
import IconTypographyBox20 from './IconTypographyBox20';
import IconTypographyBox24 from './IconTypographyBox24';
import IconTypographyBox32 from './IconTypographyBox32';

const IconTypographyBox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTypographyBox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTypographyBox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTypographyBox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTypographyBox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTypographyBox32 {...props} />}
        </span>
    );
};

const MemoizedIconTypographyBox = memo(IconTypographyBox);
MemoizedIconTypographyBox.displayName = 'FondueIconTypographyBox';

export default MemoizedIconTypographyBox;
