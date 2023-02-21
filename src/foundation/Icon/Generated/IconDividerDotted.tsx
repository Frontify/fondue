import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDividerDotted12 from './IconDividerDotted12';
import IconDividerDotted16 from './IconDividerDotted16';
import IconDividerDotted20 from './IconDividerDotted20';
import IconDividerDotted24 from './IconDividerDotted24';
import IconDividerDotted32 from './IconDividerDotted32';

const IconDividerDotted = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDividerDotted12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDividerDotted16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDividerDotted20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDividerDotted24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDividerDotted32 {...props} />}
        </span>
    );
};

const MemoizedIconDividerDotted = memo(IconDividerDotted);
MemoizedIconDividerDotted.displayName = 'FondueIconDividerDotted';

export default MemoizedIconDividerDotted;
