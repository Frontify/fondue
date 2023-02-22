import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextAlignmentLeft12 from './IconTextAlignmentLeft12';
import IconTextAlignmentLeft16 from './IconTextAlignmentLeft16';
import IconTextAlignmentLeft20 from './IconTextAlignmentLeft20';
import IconTextAlignmentLeft24 from './IconTextAlignmentLeft24';
import IconTextAlignmentLeft32 from './IconTextAlignmentLeft32';

const IconTextAlignmentLeft = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextAlignmentLeft12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextAlignmentLeft16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextAlignmentLeft20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextAlignmentLeft24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextAlignmentLeft32 {...props} />}
        </span>
    );
};
IconTextAlignmentLeft.displayName = 'FondueIconTextAlignmentLeft';

export default memo(IconTextAlignmentLeft);
