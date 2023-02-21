import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconWorkflowLanes12 from './IconWorkflowLanes12';
import IconWorkflowLanes16 from './IconWorkflowLanes16';
import IconWorkflowLanes20 from './IconWorkflowLanes20';
import IconWorkflowLanes24 from './IconWorkflowLanes24';
import IconWorkflowLanes32 from './IconWorkflowLanes32';

const IconWorkflowLanes = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconWorkflowLanes12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconWorkflowLanes16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconWorkflowLanes20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconWorkflowLanes24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconWorkflowLanes32 {...props} />}
        </span>
    );
};

const MemoizedIconWorkflowLanes = memo(IconWorkflowLanes);
MemoizedIconWorkflowLanes.displayName = 'FondueIconWorkflowLanes';

export default MemoizedIconWorkflowLanes;
