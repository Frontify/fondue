import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSketch12 from './IconSketch12';
import IconSketch16 from './IconSketch16';
import IconSketch20 from './IconSketch20';
import IconSketch24 from './IconSketch24';
import IconSketch32 from './IconSketch32';

const IconSketch = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSketch12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSketch16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSketch20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSketch24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSketch32 {...props} />}
        </span>
    );
};

const MemoizedIconSketch = memo(IconSketch);
MemoizedIconSketch.displayName = 'FondueIconSketch';

export default MemoizedIconSketch;
