import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCloudArrowDown12 from './IconCloudArrowDown12';
import IconCloudArrowDown16 from './IconCloudArrowDown16';
import IconCloudArrowDown20 from './IconCloudArrowDown20';
import IconCloudArrowDown24 from './IconCloudArrowDown24';
import IconCloudArrowDown32 from './IconCloudArrowDown32';

const IconCloudArrowDown = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCloudArrowDown12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCloudArrowDown16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCloudArrowDown20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCloudArrowDown24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCloudArrowDown32 {...props} />}
        </span>
    );
};

const MemoizedIconCloudArrowDown = memo(IconCloudArrowDown);
MemoizedIconCloudArrowDown.displayName = 'FondueIconCloudArrowDown';

export default MemoizedIconCloudArrowDown;
