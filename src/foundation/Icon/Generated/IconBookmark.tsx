import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBookmark12Filled from './IconBookmark12Filled';
import IconBookmark12 from './IconBookmark12';
import IconBookmark16Filled from './IconBookmark16Filled';
import IconBookmark16 from './IconBookmark16';
import IconBookmark20Filled from './IconBookmark20Filled';
import IconBookmark20 from './IconBookmark20';
import IconBookmark24Filled from './IconBookmark24Filled';
import IconBookmark24 from './IconBookmark24';
import IconBookmark32Filled from './IconBookmark32Filled';
import IconBookmark32 from './IconBookmark32';

const IconBookmark = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconBookmark12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconBookmark12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconBookmark16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBookmark16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconBookmark20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBookmark20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconBookmark24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBookmark24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconBookmark32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBookmark32 {...props} />}
        </span>
    );
};
IconBookmark.displayName = 'FondueIconBookmark';

export default memo(IconBookmark);
