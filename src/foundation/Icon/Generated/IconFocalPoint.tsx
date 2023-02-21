import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFocalPoint12 from './IconFocalPoint12';
import IconFocalPoint16 from './IconFocalPoint16';
import IconFocalPoint20 from './IconFocalPoint20';
import IconFocalPoint24 from './IconFocalPoint24';
import IconFocalPoint32 from './IconFocalPoint32';

const IconFocalPoint = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFocalPoint12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconFocalPoint16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconFocalPoint20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconFocalPoint24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconFocalPoint32 {...props} />}
        </span>
    );
};

const MemoizedIconFocalPoint = memo(IconFocalPoint);
MemoizedIconFocalPoint.displayName = 'FondueIconFocalPoint';

export default MemoizedIconFocalPoint;
