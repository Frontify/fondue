import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconWorkflowShapes12 from './IconWorkflowShapes12';
import IconWorkflowShapes16 from './IconWorkflowShapes16';
import IconWorkflowShapes20 from './IconWorkflowShapes20';
import IconWorkflowShapes24 from './IconWorkflowShapes24';
import IconWorkflowShapes32 from './IconWorkflowShapes32';

const IconWorkflowShapes = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconWorkflowShapes12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconWorkflowShapes16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconWorkflowShapes20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconWorkflowShapes24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconWorkflowShapes32 {...props} />}
        </span>
    );
};

const MemoizedIconWorkflowShapes = memo(IconWorkflowShapes);
MemoizedIconWorkflowShapes.displayName = 'FondueIconWorkflowShapes';

export default MemoizedIconWorkflowShapes;
