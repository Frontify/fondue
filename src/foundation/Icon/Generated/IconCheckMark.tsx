import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCheckMark12 from './IconCheckMark12';
import IconCheckMark16 from './IconCheckMark16';
import IconCheckMark20 from './IconCheckMark20';
import IconCheckMark24 from './IconCheckMark24';
import IconCheckMark32 from './IconCheckMark32';

const IconCheckMark = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCheckMark12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCheckMark16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCheckMark20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCheckMark24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCheckMark32 {...props} />}
        </span>
    );
};

const MemoizedIconCheckMark = memo(IconCheckMark);
MemoizedIconCheckMark.displayName = 'FondueIconCheckMark';

export default MemoizedIconCheckMark;
