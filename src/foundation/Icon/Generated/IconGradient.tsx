import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconGradient12 from './IconGradient12';
import IconGradient16 from './IconGradient16';
import IconGradient20 from './IconGradient20';
import IconGradient24 from './IconGradient24';
import IconGradient32 from './IconGradient32';

const IconGradient = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconGradient12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconGradient16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconGradient20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconGradient24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconGradient32 {...props} />}
        </span>
    );
};

const MemoizedIconGradient = memo(IconGradient);
MemoizedIconGradient.displayName = 'FondueIconGradient';

export default MemoizedIconGradient;
