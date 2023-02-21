import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTriangle12 from './IconTriangle12';
import IconTriangle16 from './IconTriangle16';
import IconTriangle20 from './IconTriangle20';
import IconTriangle24 from './IconTriangle24';
import IconTriangle32 from './IconTriangle32';

const IconTriangle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTriangle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTriangle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTriangle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTriangle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTriangle32 {...props} />}
        </span>
    );
};

const MemoizedIconTriangle = memo(IconTriangle);
MemoizedIconTriangle.displayName = 'FondueIconTriangle';

export default MemoizedIconTriangle;
