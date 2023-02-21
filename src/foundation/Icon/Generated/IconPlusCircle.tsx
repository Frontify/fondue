import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPlusCircle12 from './IconPlusCircle12';
import IconPlusCircle16 from './IconPlusCircle16';
import IconPlusCircle20 from './IconPlusCircle20';
import IconPlusCircle24 from './IconPlusCircle24';
import IconPlusCircle32 from './IconPlusCircle32';

const IconPlusCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPlusCircle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPlusCircle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPlusCircle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPlusCircle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPlusCircle32 {...props} />}
        </span>
    );
};

const MemoizedIconPlusCircle = memo(IconPlusCircle);
MemoizedIconPlusCircle.displayName = 'FondueIconPlusCircle';

export default MemoizedIconPlusCircle;
