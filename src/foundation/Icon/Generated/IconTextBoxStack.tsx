import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextBoxStack12 from './IconTextBoxStack12';
import IconTextBoxStack16 from './IconTextBoxStack16';
import IconTextBoxStack20 from './IconTextBoxStack20';
import IconTextBoxStack24 from './IconTextBoxStack24';
import IconTextBoxStack32 from './IconTextBoxStack32';

const IconTextBoxStack = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextBoxStack12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextBoxStack16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextBoxStack20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextBoxStack24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextBoxStack32 {...props} />}
        </span>
    );
};

const MemoizedIconTextBoxStack = memo(IconTextBoxStack);
MemoizedIconTextBoxStack.displayName = 'FondueIconTextBoxStack';

export default MemoizedIconTextBoxStack;
