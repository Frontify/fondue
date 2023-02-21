import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCloudArrowUp12 from './IconCloudArrowUp12';
import IconCloudArrowUp16 from './IconCloudArrowUp16';
import IconCloudArrowUp20 from './IconCloudArrowUp20';
import IconCloudArrowUp24 from './IconCloudArrowUp24';
import IconCloudArrowUp32 from './IconCloudArrowUp32';

const IconCloudArrowUp = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCloudArrowUp12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCloudArrowUp16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCloudArrowUp20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCloudArrowUp24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCloudArrowUp32 {...props} />}
        </span>
    );
};

const MemoizedIconCloudArrowUp = memo(IconCloudArrowUp);
MemoizedIconCloudArrowUp.displayName = 'FondueIconCloudArrowUp';

export default MemoizedIconCloudArrowUp;
