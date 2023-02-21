import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextFormatBold12 from './IconTextFormatBold12';
import IconTextFormatBold16 from './IconTextFormatBold16';
import IconTextFormatBold20 from './IconTextFormatBold20';
import IconTextFormatBold24 from './IconTextFormatBold24';
import IconTextFormatBold32 from './IconTextFormatBold32';

const IconTextFormatBold = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextFormatBold12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextFormatBold16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextFormatBold20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextFormatBold24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextFormatBold32 {...props} />}
        </span>
    );
};

const MemoizedIconTextFormatBold = memo(IconTextFormatBold);
MemoizedIconTextFormatBold.displayName = 'FondueIconTextFormatBold';

export default MemoizedIconTextFormatBold;
