import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCaretLeftDouble12 from './IconCaretLeftDouble12';
import IconCaretLeftDouble16 from './IconCaretLeftDouble16';
import IconCaretLeftDouble20 from './IconCaretLeftDouble20';
import IconCaretLeftDouble24 from './IconCaretLeftDouble24';
import IconCaretLeftDouble32 from './IconCaretLeftDouble32';

const IconCaretLeftDouble = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCaretLeftDouble12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCaretLeftDouble16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCaretLeftDouble20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCaretLeftDouble24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCaretLeftDouble32 {...props} />}
        </span>
    );
};

const MemoizedIconCaretLeftDouble = memo(IconCaretLeftDouble);
MemoizedIconCaretLeftDouble.displayName = 'FondueIconCaretLeftDouble';

export default MemoizedIconCaretLeftDouble;
