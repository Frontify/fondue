import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCaretRightDouble12 from './IconCaretRightDouble12';
import IconCaretRightDouble16 from './IconCaretRightDouble16';
import IconCaretRightDouble20 from './IconCaretRightDouble20';
import IconCaretRightDouble24 from './IconCaretRightDouble24';
import IconCaretRightDouble32 from './IconCaretRightDouble32';

const IconCaretRightDouble = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCaretRightDouble12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCaretRightDouble16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCaretRightDouble20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCaretRightDouble24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCaretRightDouble32 {...props} />}
        </span>
    );
};

const MemoizedIconCaretRightDouble = memo(IconCaretRightDouble);
MemoizedIconCaretRightDouble.displayName = 'FondueIconCaretRightDouble';

export default MemoizedIconCaretRightDouble;
