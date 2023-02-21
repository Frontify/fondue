import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconRectangleLandscape12 from './IconRectangleLandscape12';
import IconRectangleLandscape16 from './IconRectangleLandscape16';
import IconRectangleLandscape20 from './IconRectangleLandscape20';
import IconRectangleLandscape24 from './IconRectangleLandscape24';
import IconRectangleLandscape32 from './IconRectangleLandscape32';

const IconRectangleLandscape = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconRectangleLandscape12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconRectangleLandscape16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconRectangleLandscape20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconRectangleLandscape24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconRectangleLandscape32 {...props} />}
        </span>
    );
};

const MemoizedIconRectangleLandscape = memo(IconRectangleLandscape);
MemoizedIconRectangleLandscape.displayName = 'FondueIconRectangleLandscape';

export default MemoizedIconRectangleLandscape;
