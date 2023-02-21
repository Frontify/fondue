import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectRatio3To112 from './IconMediaObjectRatio3To112';
import IconMediaObjectRatio3To116 from './IconMediaObjectRatio3To116';
import IconMediaObjectRatio3To120 from './IconMediaObjectRatio3To120';
import IconMediaObjectRatio3To124 from './IconMediaObjectRatio3To124';
import IconMediaObjectRatio3To132 from './IconMediaObjectRatio3To132';

const IconMediaObjectRatio3To1 = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectRatio3To112 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectRatio3To116 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectRatio3To120 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectRatio3To124 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectRatio3To132 {...props} />}
        </span>
    );
};

const MemoizedIconMediaObjectRatio3To1 = memo(IconMediaObjectRatio3To1);
MemoizedIconMediaObjectRatio3To1.displayName = 'FondueIconMediaObjectRatio3To1';

export default MemoizedIconMediaObjectRatio3To1;
