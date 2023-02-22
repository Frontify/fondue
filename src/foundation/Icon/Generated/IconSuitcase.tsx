import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSuitcase12 from './IconSuitcase12';
import IconSuitcase16 from './IconSuitcase16';
import IconSuitcase20 from './IconSuitcase20';
import IconSuitcase24 from './IconSuitcase24';
import IconSuitcase32 from './IconSuitcase32';

const IconSuitcase = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSuitcase12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSuitcase16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSuitcase20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSuitcase24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSuitcase32 {...props} />}
        </span>
    );
};
IconSuitcase.displayName = 'FondueIconSuitcase';

export default memo(IconSuitcase);
