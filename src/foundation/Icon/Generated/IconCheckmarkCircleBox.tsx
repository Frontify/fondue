import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCheckmarkCircleBox12 from './IconCheckmarkCircleBox12';
import IconCheckmarkCircleBox16 from './IconCheckmarkCircleBox16';
import IconCheckmarkCircleBox20 from './IconCheckmarkCircleBox20';
import IconCheckmarkCircleBox24 from './IconCheckmarkCircleBox24';
import IconCheckmarkCircleBox32 from './IconCheckmarkCircleBox32';

const IconCheckmarkCircleBox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCheckmarkCircleBox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCheckmarkCircleBox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCheckmarkCircleBox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCheckmarkCircleBox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCheckmarkCircleBox32 {...props} />}
        </span>
    );
};

const MemoizedIconCheckmarkCircleBox = memo(IconCheckmarkCircleBox);
MemoizedIconCheckmarkCircleBox.displayName = 'FondueIconCheckmarkCircleBox';

export default MemoizedIconCheckmarkCircleBox;
