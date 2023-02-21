import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowCircleDown12 from './IconArrowCircleDown12';
import IconArrowCircleDown16 from './IconArrowCircleDown16';
import IconArrowCircleDown20 from './IconArrowCircleDown20';
import IconArrowCircleDown24 from './IconArrowCircleDown24';
import IconArrowCircleDown32 from './IconArrowCircleDown32';

const IconArrowCircleDown = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowCircleDown12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowCircleDown16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowCircleDown20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowCircleDown24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowCircleDown32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowCircleDown = memo(IconArrowCircleDown);
MemoizedIconArrowCircleDown.displayName = 'FondueIconArrowCircleDown';

export default MemoizedIconArrowCircleDown;
