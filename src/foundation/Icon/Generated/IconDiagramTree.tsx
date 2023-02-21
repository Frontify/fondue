import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDiagramTree12 from './IconDiagramTree12';
import IconDiagramTree16 from './IconDiagramTree16';
import IconDiagramTree20 from './IconDiagramTree20';
import IconDiagramTree24 from './IconDiagramTree24';
import IconDiagramTree32 from './IconDiagramTree32';

const IconDiagramTree = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDiagramTree12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDiagramTree16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDiagramTree20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDiagramTree24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDiagramTree32 {...props} />}
        </span>
    );
};

const MemoizedIconDiagramTree = memo(IconDiagramTree);
MemoizedIconDiagramTree.displayName = 'FondueIconDiagramTree';

export default MemoizedIconDiagramTree;
