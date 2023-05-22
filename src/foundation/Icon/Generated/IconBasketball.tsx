import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBasketball12 from './IconBasketball12';
import IconBasketball16 from './IconBasketball16';
import IconBasketball20 from './IconBasketball20';
import IconBasketball24 from './IconBasketball24';
import IconBasketball32 from './IconBasketball32';

const IconBasketball = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBasketball12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBasketball16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBasketball20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBasketball24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBasketball32 {...props} />}
        </span>
    );
};
IconBasketball.displayName = 'FondueIconBasketball';

export default memo(IconBasketball);
