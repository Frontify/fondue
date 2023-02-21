import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPaperplane12 from './IconPaperplane12';
import IconPaperplane16 from './IconPaperplane16';
import IconPaperplane20 from './IconPaperplane20';
import IconPaperplane24 from './IconPaperplane24';
import IconPaperplane32 from './IconPaperplane32';

const IconPaperplane = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPaperplane12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPaperplane16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPaperplane20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPaperplane24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPaperplane32 {...props} />}
        </span>
    );
};

const MemoizedIconPaperplane = memo(IconPaperplane);
MemoizedIconPaperplane.displayName = 'FondueIconPaperplane';

export default MemoizedIconPaperplane;
