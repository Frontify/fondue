import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextColumnBreak12 from './IconTextColumnBreak12';
import IconTextColumnBreak16 from './IconTextColumnBreak16';
import IconTextColumnBreak20 from './IconTextColumnBreak20';
import IconTextColumnBreak24 from './IconTextColumnBreak24';
import IconTextColumnBreak32 from './IconTextColumnBreak32';

const IconTextColumnBreak = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextColumnBreak12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextColumnBreak16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextColumnBreak20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextColumnBreak24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextColumnBreak32 {...props} />}
        </span>
    );
};
IconTextColumnBreak.displayName = 'FondueIconTextColumnBreak';

export default memo(IconTextColumnBreak);
