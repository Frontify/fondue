import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDividerDashed12 from './IconDividerDashed12';
import IconDividerDashed16 from './IconDividerDashed16';
import IconDividerDashed20 from './IconDividerDashed20';
import IconDividerDashed24 from './IconDividerDashed24';
import IconDividerDashed32 from './IconDividerDashed32';

const IconDividerDashed = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDividerDashed12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDividerDashed16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDividerDashed20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDividerDashed24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDividerDashed32 {...props} />}
        </span>
    );
};

const MemoizedIconDividerDashed = memo(IconDividerDashed);
MemoizedIconDividerDashed.displayName = 'FondueIconDividerDashed';

export default MemoizedIconDividerDashed;
