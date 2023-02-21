import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPills12 from './IconPills12';
import IconPills16 from './IconPills16';
import IconPills20 from './IconPills20';
import IconPills24 from './IconPills24';
import IconPills32 from './IconPills32';

const IconPills = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPills12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPills16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPills20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPills24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPills32 {...props} />}
        </span>
    );
};

const MemoizedIconPills = memo(IconPills);
MemoizedIconPills.displayName = 'FondueIconPills';

export default MemoizedIconPills;
