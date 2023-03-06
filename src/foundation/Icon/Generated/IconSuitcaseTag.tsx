import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSuitcaseTag12 from './IconSuitcaseTag12';
import IconSuitcaseTag16 from './IconSuitcaseTag16';
import IconSuitcaseTag20 from './IconSuitcaseTag20';
import IconSuitcaseTag24 from './IconSuitcaseTag24';
import IconSuitcaseTag32 from './IconSuitcaseTag32';

const IconSuitcaseTag = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSuitcaseTag12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSuitcaseTag16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSuitcaseTag20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSuitcaseTag24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSuitcaseTag32 {...props} />}
        </span>
    );
};
IconSuitcaseTag.displayName = 'FondueIconSuitcaseTag';

export default memo(IconSuitcaseTag);
