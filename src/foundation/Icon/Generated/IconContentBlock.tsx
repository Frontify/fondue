import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconContentBlock12 from './IconContentBlock12';
import IconContentBlock16 from './IconContentBlock16';
import IconContentBlock20 from './IconContentBlock20';
import IconContentBlock24 from './IconContentBlock24';
import IconContentBlock32 from './IconContentBlock32';

const IconContentBlock = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconContentBlock12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconContentBlock16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconContentBlock20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconContentBlock24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconContentBlock32 {...props} />}
        </span>
    );
};
IconContentBlock.displayName = 'FondueIconContentBlock';

export default memo(IconContentBlock);
