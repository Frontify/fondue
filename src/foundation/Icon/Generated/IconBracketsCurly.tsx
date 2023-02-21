import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBracketsCurly12 from './IconBracketsCurly12';
import IconBracketsCurly16 from './IconBracketsCurly16';
import IconBracketsCurly20 from './IconBracketsCurly20';
import IconBracketsCurly24 from './IconBracketsCurly24';
import IconBracketsCurly32 from './IconBracketsCurly32';

const IconBracketsCurly = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBracketsCurly12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBracketsCurly16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBracketsCurly20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBracketsCurly24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBracketsCurly32 {...props} />}
        </span>
    );
};

const MemoizedIconBracketsCurly = memo(IconBracketsCurly);
MemoizedIconBracketsCurly.displayName = 'FondueIconBracketsCurly';

export default MemoizedIconBracketsCurly;
