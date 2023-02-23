import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconImageWithText12 from './IconImageWithText12';
import IconImageWithText16 from './IconImageWithText16';
import IconImageWithText20 from './IconImageWithText20';
import IconImageWithText24 from './IconImageWithText24';
import IconImageWithText32 from './IconImageWithText32';

const IconImageWithText = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconImageWithText12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconImageWithText16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconImageWithText20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconImageWithText24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconImageWithText32 {...props} />}
        </span>
    );
};
IconImageWithText.displayName = 'FondueIconImageWithText';

export default memo(IconImageWithText);
