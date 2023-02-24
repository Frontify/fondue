import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTrashBin12 from './IconTrashBin12';
import IconTrashBin16 from './IconTrashBin16';
import IconTrashBin20 from './IconTrashBin20';
import IconTrashBin24 from './IconTrashBin24';
import IconTrashBin32 from './IconTrashBin32';

const IconTrashBin = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTrashBin12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTrashBin16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTrashBin20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTrashBin24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTrashBin32 {...props} />}
        </span>
    );
};
IconTrashBin.displayName = 'FondueIconTrashBin';

export default memo(IconTrashBin);
