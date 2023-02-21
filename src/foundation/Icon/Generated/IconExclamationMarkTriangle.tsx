import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconExclamationMarkTriangle12 from './IconExclamationMarkTriangle12';
import IconExclamationMarkTriangle16 from './IconExclamationMarkTriangle16';
import IconExclamationMarkTriangle20 from './IconExclamationMarkTriangle20';
import IconExclamationMarkTriangle24 from './IconExclamationMarkTriangle24';
import IconExclamationMarkTriangle32 from './IconExclamationMarkTriangle32';

const IconExclamationMarkTriangle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconExclamationMarkTriangle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconExclamationMarkTriangle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconExclamationMarkTriangle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconExclamationMarkTriangle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconExclamationMarkTriangle32 {...props} />}
        </span>
    );
};

const MemoizedIconExclamationMarkTriangle = memo(IconExclamationMarkTriangle);
MemoizedIconExclamationMarkTriangle.displayName = 'FondueIconExclamationMarkTriangle';

export default MemoizedIconExclamationMarkTriangle;
