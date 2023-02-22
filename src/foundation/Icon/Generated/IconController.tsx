import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconController12 from './IconController12';
import IconController16 from './IconController16';
import IconController20 from './IconController20';
import IconController24 from './IconController24';
import IconController32 from './IconController32';

const IconController = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconController12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconController16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconController20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconController24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconController32 {...props} />}
        </span>
    );
};
IconController.displayName = 'FondueIconController';

export default memo(IconController);
