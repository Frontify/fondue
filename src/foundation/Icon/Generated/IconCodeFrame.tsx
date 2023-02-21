import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCodeFrame12 from './IconCodeFrame12';
import IconCodeFrame16 from './IconCodeFrame16';
import IconCodeFrame20 from './IconCodeFrame20';
import IconCodeFrame24 from './IconCodeFrame24';
import IconCodeFrame32 from './IconCodeFrame32';

const IconCodeFrame = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCodeFrame12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCodeFrame16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCodeFrame20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCodeFrame24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCodeFrame32 {...props} />}
        </span>
    );
};

const MemoizedIconCodeFrame = memo(IconCodeFrame);
MemoizedIconCodeFrame.displayName = 'FondueIconCodeFrame';

export default MemoizedIconCodeFrame;
