import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPlayCircle12 from './IconPlayCircle12';
import IconPlayCircle16 from './IconPlayCircle16';
import IconPlayCircle20 from './IconPlayCircle20';
import IconPlayCircle24 from './IconPlayCircle24';
import IconPlayCircle32 from './IconPlayCircle32';

const IconPlayCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPlayCircle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPlayCircle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPlayCircle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPlayCircle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPlayCircle32 {...props} />}
        </span>
    );
};

const MemoizedIconPlayCircle = memo(IconPlayCircle);
MemoizedIconPlayCircle.displayName = 'FondueIconPlayCircle';

export default MemoizedIconPlayCircle;
