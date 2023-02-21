import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextAlignmentJustify12 from './IconTextAlignmentJustify12';
import IconTextAlignmentJustify16 from './IconTextAlignmentJustify16';
import IconTextAlignmentJustify20 from './IconTextAlignmentJustify20';
import IconTextAlignmentJustify24 from './IconTextAlignmentJustify24';
import IconTextAlignmentJustify32 from './IconTextAlignmentJustify32';

const IconTextAlignmentJustify = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextAlignmentJustify12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextAlignmentJustify16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextAlignmentJustify20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextAlignmentJustify24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextAlignmentJustify32 {...props} />}
        </span>
    );
};

const MemoizedIconTextAlignmentJustify = memo(IconTextAlignmentJustify);
MemoizedIconTextAlignmentJustify.displayName = 'FondueIconTextAlignmentJustify';

export default MemoizedIconTextAlignmentJustify;
