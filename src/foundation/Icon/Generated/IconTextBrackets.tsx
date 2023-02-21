import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextBrackets12 from './IconTextBrackets12';
import IconTextBrackets16 from './IconTextBrackets16';
import IconTextBrackets20 from './IconTextBrackets20';
import IconTextBrackets24 from './IconTextBrackets24';
import IconTextBrackets32 from './IconTextBrackets32';

const IconTextBrackets = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextBrackets12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextBrackets16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextBrackets20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextBrackets24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextBrackets32 {...props} />}
        </span>
    );
};

const MemoizedIconTextBrackets = memo(IconTextBrackets);
MemoizedIconTextBrackets.displayName = 'FondueIconTextBrackets';

export default MemoizedIconTextBrackets;
